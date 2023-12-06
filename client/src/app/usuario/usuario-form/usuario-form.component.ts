import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, TipoMessage } from 'src/app/share/services/notification.service';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  tipo: any;
  hide = true;
  usuario: any;
  roles: any;
  usuarioForm: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  listaProvincias: { id: number; nombre: string }[];
  listaCantones: { id: number; nombre: string }[];
  listaDistritos: { id: number; nombre: string }[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private noti: NotificacionService,    
    private lService: LocalizacionService
  ) {
    this.reactiveForm();
    this.getProvincias();
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
    let idProvincia = this.usuarioForm.value.codProvincia;
    this.usuarioForm.get('codCanton').setValue('');
    this.usuarioForm.get('codDistrito').setValue('');

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
    let idProvincia = this.usuarioForm.value.codProvincia;
    let idCanton = this.usuarioForm.value.codCanton;
    this.usuarioForm.get('codDistrito').setValue('');

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
  
  submitForm() {
    this.makeSubmit=true;
    if(this.usuarioForm.invalid){
     return;
    }
    this.authService.createUser(this.usuarioForm.value)
    .subscribe((respuesta:any)=>{
      this.noti.mensajeRedirect(
        'Usuario', 'Usuario creado ', 
        TipoMessage.success,'/')
      this.router.navigate(['/inicio/'])
    })
  }

  ngOnInit(): void {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.tipo = this.currentUser.tipoUsuario;
  }

  reactiveForm() {
    this.usuarioForm = this.fb.group({
      tipoUsuario: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasenna: ['', [Validators.required]],
      codProvincia: [null, Validators.required],
      codCanton: [null, Validators.required],
      codDistrito: [null, Validators.required],
    });
    this.getRoles();
  }

  onReset() {
    this.usuarioForm.reset();
  }
  
  getRoles() {
    this.gService
      .list('tipoUsuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
        console.log( this.roles);
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.usuarioForm.controls[control].hasError(error);
  };

}
