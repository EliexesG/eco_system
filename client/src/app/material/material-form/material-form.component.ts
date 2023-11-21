import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subject, concatMap, filter, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { NotificacionService } from 'src/app/share/services/notification.service';
import { TipoMessage } from 'src/app/share/services/notification.service';
import { ImageService } from 'src/app/share/services/image.service';

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
  imagenBase64: string;

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
                imagen: '',
              });

              return EMPTY;
              /*
              return this.fbService.getMetadata(this.materialInfo.imagen).pipe(
                takeUntil(this.destroy$),
                concatMap(async (metadata) => {

                  const promesaArchivo = await fetch(this.materialInfo.imagen);
                  const archivo = await promesaArchivo.blob();
                  const file = new File(
                    [archivo],
                    metadata.name,
                    {
                      type: metadata.contentType,
                    }
                  );   

                  this.materialForm.get('imagen').setValue(file);
                  this.imagenPrevia = metadata;
                  this.onImagenSeleccionada();
                  return EMPTY;
                })
              );
              */
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
          Validators.maxLength(30),
        ]),
      ],
      imagen: [null, Validators.required],
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

    let valorForm = this.materialForm.value;

    let imagename = this.createFileName(valorForm.nombre, this.imagen.name);

    var imageForm = new FormData();
    imageForm.append('image', this.imagen, imagename);

    if (this.isCreate) {
      this.cargando = true;

      let create$ = this.iService.uploadImage(imageForm).pipe(
        takeUntil(this.destroy$),
        concatMap((result) => {
          valorForm.imagen = imagename;
          console.log(valorForm);

          return this.gService.create('material', valorForm).pipe(
            takeUntil(this.destroy$),
            concatMap((data) => {
              console.log(data);
              this.cargando = false;
              this.respMaterial = data;
              this.noti.mensajeRedirect(
                'Crear Material',
                `Material creado "${data.nombre}"`,
                TipoMessage.success,
                '/material/all'
              );
              return EMPTY;
            })
          );
        })
      );

      create$.subscribe(() => {
        this.router.navigate(['/material/all']);
      });
    } else {
      this.cargando = true;

      let update$ = this.iService.uploadImage(valorForm.imagen).pipe(
        takeUntil(this.destroy$),
        concatMap((result) => {
          return this.gService.update('material', valorForm).pipe(
            takeUntil(this.destroy$),
            concatMap((data) => {
              valorForm.imagen = imagename;

              console.log(data);
              this.cargando = false;
              this.respMaterial = data;
              this.noti.mensajeRedirect(
                'Actualizar Material',
                `Material actualizado "${data.nombre}"`,
                TipoMessage.success,
                '/material/all'
              );
              return EMPTY;
            })
          );
        })
      );

      update$.subscribe(() => {
        this.router.navigate(['/material/all']);
      });
    }
  }

  private createFileName(materialName: string, fileName: string) {
    let split: string[] = fileName.split('.');

    let extension: string = split[split.length - 1];

    return `material_${materialName}.${extension}`.toUpperCase();
  }

  onImagenSeleccionada(event: any) {
    this.imagen = event.target.files[0];

    if (this.imagen) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result contiene la URL de la imagen
        let eve = e.target.result;
      };
      reader.readAsDataURL(this.imagen); // Esto lee el archivo como una URL base64
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagen);
    reader.onload = () => {
      console.log(reader.result as string);
      this.imagenBase64 = reader.result as string;
    };
  }

  onChangeColor(): void {
    let color = {
      codColor: this.materialForm.get('codColor').value.toUpperCase(),
    };
    let colorExiste: boolean = false;

    for (let colorActual of this.colores) {
      if (colorActual.codColor === color.codColor) {
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
  }

  onBack(): void {
    this.router.navigate(['/material/all']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
