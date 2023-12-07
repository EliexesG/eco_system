import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-contrasenna',
  templateUrl: './usuario-contrasenna.component.html',
  styleUrls: ['./usuario-contrasenna.component.css'],
})
export class UsuarioContrasennaComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  formulario: FormGroup;
  correo: string = '';

  constructor(
    private authService: AuthenticationService,
    private notiService: NotificacionService,
    private diagRef: DialogRef,
    private fb: FormBuilder
  ) {
    this.reactiveForm();
    this.loadCorreo();
  }

  onSubmit() {
    if (!this.formulario.valid) return;

    let formData = this.formulario.value;

    let formattedData = {
      ...formData,
      correo: this.correo
    }

    console.log(formattedData)

    this.authService
      .cambiarContrasenna(formattedData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response.error) {
          this.notiService.mensaje(
            'Error',
            'Ocurrió un error al cambiar la contraseña',
            TipoMessage.error
          );
        } else if (!response.success) {
          this.notiService.mensaje(
            'Error',
            response.response,
            TipoMessage.error
          );
        } else {
          this.notiService.mensaje(
            'Cambio de Contraseña',
            'Contraseña cambiada correctamente',
            TipoMessage.success
          );
          this.onClose();
        }
      });
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      contrasennaVieja: ['', Validators.compose([Validators.required])],
      contrasennaNueva: ['', Validators.compose([Validators.required])],
    });
  }

  loadCorreo() {
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        if (usuario) {
          this.correo = usuario.correo;
        }
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onClose() {
    this.diagRef.close();
  }
}
