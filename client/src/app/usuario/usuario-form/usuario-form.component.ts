import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';
import { DialogRef } from '@angular/cdk/dialog';

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
  titleForm: string = 'Crear';
  categoriaList: any;
  usuarioInfo: any;
  respInfo: any;
  submitted = false;
  idUsuario: number = 0;
  cargando: boolean = false;
  isCreate: boolean = true;

  listaCentros: { id: number; nombre: string }[];
  listaProvincias: { id: number; nombre: string }[];
  listaCantones: { id: number; nombre: string }[];
  listaDistritos: { id: number; nombre: string }[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private activeRouter: ActivatedRoute,
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
    this.makeSubmit = true;
    if (this.usuarioForm.invalid) {
      return;
    } else {
      let valorForm = this.usuarioForm.value;

      let valorFormFinal = {
        id: valorForm.id,
        tipoUsuario: valorForm.tipoUsuario,
        identificacion: valorForm.identificacion,
        nombre: valorForm.nombre,
        primerApellido: valorForm.primerApellido,
        segundoApellido: valorForm.segundoApellido,
        correo: valorForm.correo,
        contrasenna: valorForm.contrasenna,
        direccionUsuario: {
          codProvincia: valorForm.codProvincia,
          codCanton: valorForm.codCanton,
          codDistrito: valorForm.codDistrito,
          sennas: valorForm.sennas,
        },
      };

      console.log(valorFormFinal);

      if (this.isCreate) {
        this.gService
          .create('usuario', valorFormFinal)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.cargando = false;
            this.respInfo = data;
          });

        this.authService
          .createUser(this.usuarioForm.value)
          .subscribe((respuesta: any) => {
            this.onReset();
            this.noti.mensajeRedirect(
              'Usuario',
              'Usuario creado',
              TipoMessage.success,
              this.isAutenticated ? '/usuario/all' : '/inicio'
            );
          });
      } else {
        this.cargando = true;

        this.gService
          .update('usuario', valorFormFinal)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.onReset();
            this.cargando = false;
            this.respInfo = data;
            this.noti.mensajeRedirect(
              'Acualizar usuario',
              `Usuario Actualizado: "${data.nombre}"`,
              TipoMessage.success,
              this.isAutenticated ? '/usuario/all' : '/inicio'
            );
          });
      }
    }
  }

  ngOnInit(): void {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    if (this.isAutenticated) {
      this.tipo = this.currentUser.tipoUsuario;
    }

    this.activeRouter.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      if (this.idUsuario && !isNaN(Number(this.idUsuario))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        this.gService
          .get('usuario', this.idUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.usuarioInfo = data;
            console.log(this.usuarioInfo);

            this.usuarioForm.setValue({
              id: this.usuarioInfo.id,
              tipoUsuario: this.usuarioInfo.tipoUsuario,
              identificacion: this.usuarioInfo.identificacion,
              nombre: this.usuarioInfo.nombre,
              primerApellido: this.usuarioInfo.primerApellido,
              segundoApellido: this.usuarioInfo.segundoApellido,
              correo: this.usuarioInfo.correo,
              contrasenna: 'NAAAAAAs',
              direccionUsuario: this.usuarioInfo.direccionUsuario,
              codProvincia: this.usuarioInfo.direccionUsuario.codProvincia,
              codCanton: '',
              codDistrito: '',
              sennas: this.usuarioInfo.direccionUsuario.sennas,
            });

            this.onProvinciaChange();

            this.usuarioForm
              .get('codCanton')
              .setValue(this.usuarioInfo.direccionUsuario.codCanton);

            this.onCantonChange();

            this.usuarioForm
              .get('codDistrito')
              .setValue(this.usuarioInfo.direccionUsuario.codDistrito);
          });
      }
    });
  }

  reactiveForm() {
    this.usuarioForm = this.fb.group({
      id: [null, null],
      tipoUsuario: ['CLIENTE', [Validators.required]],
      identificacion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(17),
        ]),
      ],
      nombre: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      primerApellido: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      segundoApellido: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenna: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      codProvincia: [null, Validators.required],
      codCanton: [null, Validators.required],
      codDistrito: [null, Validators.required],
      sennas: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      direccionUsuario: [null, null],
    });
  }

  onReset() {
    this.usuarioForm.reset();
  }

  onBack() {
    if (this.isAutenticated && this.tipo == 'ADMINISTRADOR') {
      this.router.navigate(['usuario/all']);
    } else {
      this.router.navigate(['inicio']);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.usuarioForm.controls[control].hasError(error);
  };
}
