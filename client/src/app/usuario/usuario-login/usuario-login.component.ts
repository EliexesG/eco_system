import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialDiagComponent } from 'src/app/material/material-diag/material-diag.component';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css'],
})
export class UsuarioLoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<MaterialDiagComponent>,
    private noti: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onReset() {
    this.formulario.reset();
    this.dialogRef.close();
  }

  submitForm() {
    this.makeSubmit = true;

    if (this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value)

    this.authService.loginUser(this.formulario.value).subscribe(
      (Response) => {
        console.log(Response)
        this.noti.mensaje('Usuario', 'Usuario logueado: ', TipoMessage.success);
        this.router.navigate(['/'], {
          relativeTo: this.route,
        });
        this.dialogRef.close();
        window.location.reload();
      },
      (Error) => {
        console.log(Error)
        this.noti.mensaje(
          'Error',
          'Verifique la contraseña y/o correo',
          TipoMessage.error
        );
      }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}