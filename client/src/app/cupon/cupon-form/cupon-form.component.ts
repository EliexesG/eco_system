import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subject, concatMap, filter, switchMap, takeUntil } from 'rxjs';

import { GenericService } from 'src/app/share/services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/services/notification.service';
import { FireBaseStorageService } from 'src/app/share/services/fire-base-storage.service';

@Component({
  selector: 'app-cupon-form',
  templateUrl: './cupon-form.component.html',
  styleUrls: ['./cupon-form.component.css']
})
export class CuponFormComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  categoriaList: any;
  cuponInfo: any;
  respCupon: any;
  submitted = false;
  cuponForm: FormGroup;
  idCupon: number = 0;
  isCreate: boolean = true;
  numRegex = /^[0-9]+$/;
  cargando: boolean = false;
  listaCategorias: string[] = [
    'ALIMENTOS',
    'EDUCACION',
    'HOGAR',
    'JARDINERIA',
    'ROPA',
    'TRANSPORTE',
    'TURISMO',
    'VARIOS'
  ];
  imagenPrevia: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private fbService: FireBaseStorageService
  ) {
    this.formularioReactive();
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCupon = params['id'];
      if (this.idCupon && !isNaN(Number(this.idCupon))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        let getCuponData$ = this.gService
          .get('cupon', this.idCupon)
          .pipe(
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
                imagen: ''
              });

              return this.fbService.getMetadata(this.cuponInfo.imagen).pipe(
                takeUntil(this.destroy$),
                concatMap(async (metadata) => {

                  const promesaArchivo = await fetch(this.cuponInfo.imagen);
                  const archivo = await promesaArchivo.blob();
                  const file = new File(
                    [archivo],
                    metadata.name,
                    {
                      type: metadata.contentType,
                    }
                  );                  

                  console.log(file);

                  this.cuponForm.get('imagen').setValue(file);
                  this.imagenPrevia = metadata;
                  return EMPTY;
                })
              );
            })
          );
        getCuponData$.subscribe();
      }

      this.gService
        .list('cupon/')
    });
  }

  formularioReactive() {
    this.cuponForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      descripcion: [null, Validators.compose([
        Validators.maxLength(500),
        Validators.minLength(20)
      ])],
      monedasCupon: [null,
        Validators.compose([Validators.required,
        Validators.pattern(this.numRegex)])
      ],
      imagen: [null, Validators.required],
      categoria: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.cuponForm.controls[control].hasError(error);
  };

  submitCupon(): void {
    this.submitted = true;
    if (this.cuponForm.invalid) return;
    let valorForm = this.cuponForm.value;

    
    if (this.isCreate) {
      this.cargando = true;
      let create$ = this.fbService
        .uploadArchivoImagen(
          this.createFileName(valorForm.nombre, valorForm.imagen.name),
          valorForm.imagen,
          'cupones'
        )
        .percentageChanges()
        .pipe(
          takeUntil(this.destroy$),
          filter((porcentaje: number) => porcentaje == 100),
          switchMap((_) => {
            return this.fbService
              .getURLArchivoImagen(
                this.createFileName(valorForm.nombre, valorForm.imagen.name),
                'cupones'
              )
              .pipe(takeUntil(this.destroy$),
                concatMap((url: string) => {
                  valorForm.imagen = url;
                  return this.gService.create('cupon/', valorForm).pipe(
                    takeUntil(this.destroy$),
                    concatMap((data) => {
                      console.log(data);
                      this.cargando = false;
                      this.respCupon = data;
                      this.noti.mensajeRedirect(
                        'Crear cupón',
                        `Cupón creado "${data.nombre}"`,
                        TipoMessage.success,
                        '/cupon/all'
                      );
                      return EMPTY;
                    })
                  );
                })
              );
          })
        );

      create$.subscribe(() => {
        this.router.navigate(['/cupon/all']);
      });
    } else {
      this.cargando = true;

      let update$ = this.fbService
        .uploadArchivoImagen(
          this.createFileName(valorForm.nombre, valorForm.imagen.name),
          valorForm.imagen,
          'cupones'
        )
        .percentageChanges()
        .pipe(
          takeUntil(this.destroy$),
          filter((porcentaje: number) => porcentaje == 100),
          switchMap((_) => {
            console.log(_);
            return this.fbService
              .getURLArchivoImagen(
                this.createFileName(valorForm.nombre, valorForm.imagen.name),
                'cupones'
              )
              .pipe(
                takeUntil(this.destroy$),
                concatMap((url: string) => {
                  console.log(url);
                  valorForm.imagen = url;
                  return this.gService.update('cupon', valorForm).pipe(
                    takeUntil(this.destroy$),
                    concatMap((data) => {
                      console.log(data);
                      this.cargando = false;
                      this.respCupon = data;
                      this.noti.mensajeRedirect(
                        'Actualizar cupón',
                        `Cupón actualizado "${data.nombre}"`,
                        TipoMessage.success,
                        '/cupon/all'
                      );
                      return EMPTY;
                    })
                  );
                })
              );
          })
        );

      update$.subscribe(() => {
        this.router.navigate(['/cupon/all']);
      });
    }
  }

  private createFileName(materialName: string, fileName: string) {
    let split: string[]= fileName.split('.');

    let extension: string = split[split.length-1];
    
    return `cupon_${materialName}.${extension}`;
  }

  onReset() {
    this.submitted = false;
    this.cuponForm.reset();
  }
  onBack() {
    this.router.navigate(['/cupon/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
