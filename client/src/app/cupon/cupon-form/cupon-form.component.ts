import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { GenericService } from 'src/app/share/services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/services/notification.service';

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
  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCupon = params['id'];
      if (this.idCupon != undefined && !isNaN(Number(this.idCupon))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('cupon', this.idCupon)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.cuponInfo = data;
            console.log(this.cuponInfo)
            this.cuponInfo.setValue({
              id: this.cuponInfo.id,
              nombre: this.cuponInfo.nombre,
              descripcion: this.cuponInfo.descripcion,
              imagen: this.cuponInfo.imagen,
              categoria: this.cuponInfo.categoria,
              fechaInicio: this.cuponInfo.fechaInicio,
              fechaFin: this.cuponInfo.fechaFin,
              monedasCupon: this.cuponInfo.monedasCupon
            })
          })
      }
    })
  }

  formularioReactive() {
    //[null, Validators.required]
    this.cuponForm=this.fb.group({
      id: [null, null],
      nombre:[
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      descripcion:[null, Validators.required],
      precio:[null, 
        Validators.compose([Validators.required,
          Validators.pattern(this.numRegex)])
      ],
      publicar:[true, Validators.required],
      generos:[null, Validators.required]

    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.cuponForm.controls[control].hasError(error);
  };

  submitCupon(): void {
    console.log(this.cuponForm.value)
    this.submitted=true;
    if(this.cuponForm.invalid) return;
    let gFormat: any= this.cuponForm.get('generos').value
                      .map((x: any) => ( { ['id']: x }) )
    console.log(this.cuponForm.value)
    if (this.isCreate) {
      this.gService
        .create('cupon',this.cuponForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.respCupon=data;
          this.noti.mensajeRedirect('Crear cupon',
              `Cupon creado: ${data.nombre}`,
              TipoMessage.success,
              '/cupon/all');
          this.router.navigate(['/cupon/all'])
        })
    } else {
      this.gService
        .update('cupon',this.cuponForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.respCupon=data;
          this.noti.mensajeRedirect('Actualizar cupon',
              `cupon actualizado: ${data.nombre}`,
              TipoMessage.success,
              '/cupon/all');
          this.router.navigate(['/cupon/all'])
        })
    }
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
