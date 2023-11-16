import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FireBaseStorageService } from 'src/app/share/services/fire-base-storage.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { NotificacionService } from 'src/app/share/services/notification.service';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';

@Component({
  selector: 'app-centro-acopio-form',
  templateUrl: './centro-acopio-form.component.html',
  styleUrls: ['./centro-acopio-form.component.css'],
})
export class CentroAcopioFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  categoriaList: any;
  centroInfo: any;
  respInfo: any;
  submitted = false;
  centroForm: FormGroup;
  idCentro: number = 0;
  isCreate: boolean = true;
  numRegex = /^[0-9]+$/;
  cargando: boolean = false;
  listaAdministrador: any;
  listaMateriales: any;
  listaProvincias: { id: number; nombre: string }[];
  listaCantones: { id: number; nombre: string }[];
  listaDistritos: { id: number; nombre: string }[];
  numberoRegex = /^[0-9]{4}$/

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private lService: LocalizacionService
  ) {
    this.formularioReactive();
    this.listMateriales();
    this.listAdministrador();
  }

  ngOnInit(): void {
    this.getProvincias();

    this.activeRouter.params.subscribe((params: Params) => {
      this.idCentro = params['id'];

      if (this.idCentro && !isNaN(Number(this.idCentro))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        this.gService
          .get('centroacopio', this.idCentro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.centroInfo = data;
            this.centroForm.setValue({
              id: this.centroInfo.id,
              nombre: this.centroInfo.nombre,
              telefono: this.centroInfo.telefono,
              administrador: this.centroInfo.administrador,
              materiales: this.centroInfo.materiales.map(({ id }) => id),
              horarios: this.centroInfo.horarios.map(({ id }) => id),
              direccionCentroAcopio: this.centroInfo.horarios.map(
                ({ id }) => id
              ),
            });
          });
      }
    });
  }

  formularioReactive() {
    this.centroForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
      ],
      telefono: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
        ]),
      ],
      administrador: [null, Validators.required],
      desabilitado: [false, Validators.required],
      horaInicio: [null, Validators.required],
      horaCierre: [null, Validators.required],
      materiales: [null, Validators.required],
      codProvincia: [null, Validators.required],
      codCanton: [null, Validators.required],
      codDistrito: [null, Validators.required],
      sennas: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(40),
        ]),
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.centroForm.controls[control].hasError(error);
  };

  submitCentro(): void {
    this.submitted = true;

    if (this.centroForm.invalid) return;
    let gFormat: any = this.centroForm
      .get('materiales')
      .value.map((x: any) => ({ ['id']: x }));
    this.centroForm.patchValue({ materiales: gFormat });
  }

  listMateriales() {
    this.listaMateriales = null;
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listaMateriales = data;
      });
  }

  listAdministrador() {
    this.listaAdministrador = null;
    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listaAdministrador = data;
      });
  }

  getProvincias() {
    this.listaProvincias = null;

    let lista: { id: number; nombre: string }[] = [];

    this.lService
      .getProvincias()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        Object.keys(data).forEach((key) => {
          let provincia: { id: number; nombre: string } = {
            id: parseInt(key),
            nombre: filtrarElementoByKey(parseInt(key), data),
          };
          lista.push(provincia);
        });

        this.listaProvincias = lista;
      });
  }

  onProvinciaChange() {
    this.listaCantones = null;

    let lista: { id: number; nombre: string }[] = [];
    let idProvincia = this.centroForm.value.codProvincia;
    this.centroForm.get('codCanton').setValue('');
    this.centroForm.get('codDistrito').setValue('');
    

    this.lService
      .getCantonByPronvicia(idProvincia)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        Object.keys(data).forEach((key) => {
          let canton: { id: number; nombre: string } = {
            id: parseInt(key),
            nombre: filtrarElementoByKey(parseInt(key), data),
          };
          lista.push(canton);
        });

        this.listaCantones = lista;
      });
  }

  onCantonChange() {
    this.listaDistritos = null;

    let lista: { id: number; nombre: string }[] = [];
    let idProvincia = this.centroForm.value.codProvincia;
    let idCanton = this.centroForm.value.codCanton;
    this.centroForm.get('codDistrito').setValue('');
    

    this.lService
      .getDistritoByCantonYProvincia(idProvincia, idCanton)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        Object.keys(data).forEach((key) => {
          let distrito: { id: number; nombre: string } = {
            id: parseInt(key),
            nombre: filtrarElementoByKey(parseInt(key), data),
          };
          lista.push(distrito);
        });

        this.listaDistritos = lista;
      });
  }


  onReset() {
    this.submitted = false;
    this.centroForm.reset();
  }

  onBack() {
    this.router.navigate(['/centroacopio/all']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
