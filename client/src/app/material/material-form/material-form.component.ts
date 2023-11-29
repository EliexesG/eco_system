import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subject, concatMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { NotificacionService } from 'src/app/share/services/notification.service';
import { TipoMessage } from 'src/app/share/services/notification.service';
import { ImageService } from 'src/app/share/services/image.service';
import { createFileName, dataURItoBlob } from 'src/app/share/utils/fileUtils';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css'],
})
export class MaterialFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  materialInfo: any;
  respMaterial: any;
  submitted = false;
  materialForm: FormGroup;
  idMaterial: number = 0;
  isCreate: boolean = true;
  numRegex = /^[0-9]+$/;
  cargando: boolean = false;
  unidadesMedida: string[] = [
    'kilogramo',
    'litro',
    'gramo',
    'libra',
    'onza',
    'tonelada',
    'bolsa',
  ];
  colores: { codColor: string }[];
  imagen: File;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private iService: ImageService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idMaterial = params['id'];

      if (this.idMaterial && !isNaN(Number(this.idMaterial))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        let getMaterialData$ = this.gService
          .get('material', this.idMaterial)
          .pipe(
            takeUntil(this.destroy$),
            concatMap((data: any) => {
              console.log(data);
              this.materialInfo = data;

              this.materialForm.setValue({
                id: this.materialInfo.id,
                nombre: this.materialInfo.nombre,
                codColor: this.materialInfo.codColor,
                descripcion: this.materialInfo.descripcion,
                unidadMedida: this.materialInfo.unidadMedida,
                monedasUnidad: this.materialInfo.monedasUnidad,
              });

              let objIndex = this.colores.findIndex((color) => color.codColor == this.materialInfo.codColor);
              this.colores.splice(objIndex, 1);

              return this.iService
                .getImage({ filename: this.materialInfo.imagen })
                .pipe(
                  takeUntil(this.destroy$),
                  concatMap((base64: any) => {
                    this.imagen = dataURItoBlob(base64.base64) as File;

                    return EMPTY;
                  })
                );
            })
          );

        getMaterialData$.subscribe();
      }

      this.gService
        .list('material/colores')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.colores = data;
        });
    });
  }

  formularioReactive() {
    this.materialForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ],
      descripcion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
      ],
      codColor: [null, Validators.required],
      unidadMedida: [null, Validators.required],
      monedasUnidad: [
        null,
        Validators.compose([
          Validators.pattern(this.numRegex),
          Validators.required,
        ]),
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.materialForm.controls[control].hasError(error);
  };

  submitMaterial(): void {
    this.submitted = true;

    if (this.materialForm.invalid) return;
    if (!this.imagen) {
      this.noti.mensaje(
        'Cuidado',
        'Debe seleccionar una imagen',
        TipoMessage.warning
      );
      return;
    }

    let formValues = this.materialForm.value;
    let fileName = createFileName(
      formValues.nombre,
      this.imagen.name,
      'material'
    );

    var imageToForm = new FormData();
    imageToForm.append('imagen', this.imagen, fileName);

    if (this.isCreate) {
      this.cargando = true;

      let create$ = this.iService.uploadImage(imageToForm).pipe(
        takeUntil(this.destroy$),
        concatMap((result) => {
          formValues.imagen = fileName;

          if (!result.error) {
            return this.gService.create('material', formValues).pipe(
              takeUntil(this.destroy$),
              concatMap((data) => {
                this.cargando = false;

                if (!data.error) {
                  this.respMaterial = data;

                  //refreshing form
                  this.onReset();

                  this.noti.mensajeRedirect(
                    'Crear Material',
                    `Material creado "${data.response.nombre}"`,
                    TipoMessage.success,
                    '/material/all'
                  );
                } else {
                  this.noti.mensaje(
                    'Error',
                    'Error al guardar material',
                    TipoMessage.error
                  );
                }

                return EMPTY;
              })
            );
          } else {
            this.noti.mensaje(
              'Error',
              'Error al guardar imagen',
              TipoMessage.error
            );
            return EMPTY;
          }
        })
      );

      create$.subscribe();
    } else {
      this.cargando = true;

      let update$ = this.iService.uploadImage(imageToForm).pipe(
        takeUntil(this.destroy$),
        concatMap((result) => {
          formValues.imagen = fileName;

          if (!result.error) {
            return this.gService.update('material', formValues).pipe(
              takeUntil(this.destroy$),
              concatMap((data) => {
                this.cargando = false;

                if (!data.error) {
                  this.respMaterial = data;

                  //refreshing form
                  this.onReset();

                  this.noti.mensajeRedirect(
                    'Actualizar Material',
                    `Material actualizado "${data.response.nombre}"`,
                    TipoMessage.success,
                    '/material/all'
                  );
                } else {
                  this.noti.mensaje(
                    'Error',
                    'Error al actualizar material',
                    TipoMessage.error
                  );
                }

                return EMPTY;
              })
            );
          } else {
            this.noti.mensaje(
              'Error',
              'Error al aztualizar imagen',
              TipoMessage.error
            );
            return EMPTY;
          }
        })
      );

      update$.subscribe();
    }
  }

  onImagenSelect(event: any) {
    this.imagen = event.addedFiles[0];
  }

  onChangeColor(): void {

    let color = {
      codColor: this.materialForm.get('codColor').value.toUpperCase(),
    };

    console.log(color)
    let colorExiste: boolean = false;

    for (let colorActual of this.colores) {
      if (colorActual.codColor.toUpperCase() === color.codColor) {
        colorExiste = true;
        break;
      }
    }

    if (colorExiste) {
      this.noti.mensaje(
        'Cuidado',
        'El color seleccionado ya existe para otro material',
        TipoMessage.warning
      );
      this.materialForm.get('codColor').setValue('');
    }
  }

  onReset(): void {
    this.submitted = false;
    this.materialForm.reset();
    this.imagen = null;
  }

  onBack(): void {
    this.router.navigate(['/material/all']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
