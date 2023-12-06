import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { UsuarioDiagComponent } from '../usuario-diag/usuario-diag.component';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<UsuarioDiagComponent>,
    private noti: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      contrasenna: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onReset() {
    this.dialogRef.close();
  }

  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formulario.invalid){
      this.formulario.reset();
     return;
    }

   let valoresForm= this.formulario;

    console.log('Formulario: '+valoresForm.value)
    //Login API
    this.authService.loginUser(valoresForm.value)
    .subscribe((respuesta:any)=>{
      this.noti.mensajeRedirect(
        'Usuario', 'Usuario logueado: ', 
        TipoMessage.success,'/')
      this.router.navigate(['/'])
    })  
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
