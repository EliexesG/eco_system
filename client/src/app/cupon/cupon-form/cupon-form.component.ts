import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subject, concatMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { ImageService } from 'src/app/share/services/image.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { dataURItoBlob, createFileName } from 'src/app/share/utils/fileUtils';

@Component({
  selector: 'app-cupon-form',
  templateUrl: './cupon-form.component.html',
  styleUrls: ['./cupon-form.component.css'],
})
export class CuponFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  cuponInfo: any;
  respCupon: any;
  submitted = false;
  cuponForm: FormGroup;
  idCupon: number = 0;
  isCreate: boolean = true;
  numRegex = /^[0-9]+$/;
  cargando: boolean = false;
  listaCategorias: string[];
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
    let categoriasData$ = this.gService
      .list('cupon/categorias')
      .pipe(takeUntil(this.destroy$));
    categoriasData$.subscribe((categorias) => {
      console.log(categorias);
      this.listaCategorias = categorias;
    });

    this.activeRouter.params.subscribe((params: Params) => {
      this.idCupon = params['id'];

      if (this.idCupon && !isNaN(Number(this.idCupon))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        let getCuponData$ = this.gService.get('cupon', this.idCupon).pipe(
          takeUntil(this.destroy$),
          concatMap((data: any) => {
            console.log(data);
            this.cuponInfo = data;

            this.cuponForm.setValue({
              id: this.cuponInfo.id,
              nombre: this.cuponInfo.nombre,
              descripcion: this.cuponInfo.descripcion,
              categoria: this.cuponInfo.categoria,
              fechaInicio: this.cuponInfo.fechaInicio,
              fechaFin: this.cuponInfo.fechaFin,
              monedasCupon: this.cuponInfo.monedasCupon,
            });

            return this.iService
              .getImage({ filename: this.cuponInfo.imagen })
              .pipe(
                takeUntil(this.destroy$),
                concatMap((base64: any) => {
                  this.imagen = dataURItoBlob(base64.base64) as File;

                  return EMPTY;
                })
              );
          })
        );

        getCuponData$.subscribe();
      }
    });
  }

  formularioReactive() {
    this.cuponForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      descripcion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(20),
        ]),
      ],
      monedasCupon: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
        ]),
      ],
      categoria: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.cuponForm.controls[control].hasError(error);
  };

  submitCupon(): void {
    this.submitted = true;

    if (this.cuponForm.invalid) return;
    if (!this.imagen) {
      this.noti.mensaje(
        'Cuidado',
        'Debe seleccionar una imagen',
        TipoMessage.warning
      );
      return;
    }

    let formValues = this.cuponForm.value;
    let fileName = createFileName(formValues.nombre, this.imagen.name, 'cupon');

    var imageToForm = new FormData();
    imageToForm.append('imagen', this.imagen, fileName);
    console.log(formValues);

    if (this.isCreate) {
      this.cargando = true;

      let create$ = this.iService.uploadImage(imageToForm).pipe(
        takeUntil(this.destroy$),
        concatMap((result) => {
          formValues.imagen = fileName;

          if (!result.error) {
            return this.gService.create('cupon', formValues).pipe(
              takeUntil(this.destroy$),
              concatMap((data) => {
                this.cargando = false;

                if (!data.error) {
                  this.respCupon = data;

                  //refreshing form
                  this.onReset();

                  this.noti.mensajeRedirect(
                    'Crear Cupon',
                    `Cupon creado "${data.response.nombre}"`,
                    TipoMessage.success,
                    '/cupon/all'
                  );
                } else {
                  this.noti.mensaje(
                    'Error',
                    'Error al guardar cupon',
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
            return this.gService.update('cupon', formValues).pipe(
              takeUntil(this.destroy$),
              concatMap((data) => {
                this.cargando = false;

                if (!data.error) {
                  this.respCupon = data;

                  //refreshing form
                  this.onReset();

                  this.noti.mensajeRedirect(
                    'Actualizar Cupon',
                    `Cupon actualizado "${data.response.nombre}"`,
                    TipoMessage.success,
                    '/cupon/all'
                  );
                } else {
                  console.log(data.response);
                  this.noti.mensaje(
                    'Error',
                    'Error al actualizar cupon',
                    TipoMessage.error
                  );
                }

                return EMPTY;
              })
            );
          } else {
            this.noti.mensaje(
              'Error',
              'Error al actualizar imagen',
              TipoMessage.error
            );
            return EMPTY;
          }
        })
      );

      update$.subscribe(() => {
        this.router.navigate(['/cupon/all']);
      });
    }
  }

  onImagenSelect(event: any) {
    this.imagen = event.addedFiles[0];
  }

  onReset() {
    this.submitted = false;
    this.cuponForm.reset();
    this.imagen = null;
  }

  onBack() {
    this.router.navigate(['/cupon/all']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
