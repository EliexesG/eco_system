import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FireBaseStorageService } from 'src/app/share/services/fire-base-storage.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { NotificacionService } from 'src/app/share/services/notification.service';

@Component({
  selector: 'app-centro-acopio-form',
  templateUrl: './centro-acopio-form.component.html',
  styleUrls: ['./centro-acopio-form.component.css']
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
  listaMateriales: any

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private fbService: FireBaseStorageService
  ) {
    this.formularioReactive();
    this.listMateriales();
    this.listAdministrador();
  }

  formularioReactive() {
    this.centroForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3)])
      ],
      telefono: [null, Validators.required],
      administrador: [null, Validators.required],
      materiales: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaFin: [null, Validators.required]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.centroForm.controls[control].hasError(error);
  };

  submitCentro(): void {
    this.submitted = true;

    if (this.centroForm.invalid) return;
    let gFormat: any = this.centroForm.get('materiales').value.map((x: any) => ({ ['id']: x }))
    this.centroForm.patchValue({ materiales: gFormat })
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
            })
  }


  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCentro = params['id'];

      if (this.idCentro && !isNaN(Number(this.idCentro))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        this.gService
          .get('centroacopio', this.idCentro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any)=>{
            this.centroInfo=data;
            this.centroForm.setValue({
              id: this.centroInfo.id,
              nombre: this.centroInfo.nombre,
              telefono: this.centroInfo.telefono,
              administrador: this.centroInfo.administrador,
              materiales: this.centroInfo.materiales.map(({id})=>id),
              horarios: this.centroInfo.horarios.map(({id})=>id),
              direccionCentroAcopio: this.centroInfo.horarios.map(({id})=>id),
            })
          })
      }
    })
  }

  onReset() {
    this.submitted = false;
    this.centroForm.reset();
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
