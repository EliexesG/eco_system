import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { ImageService } from 'src/app/share/services/image.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';

@Component({
  selector: 'app-cupon-diag',
  templateUrl: './cupon-diag.component.html',
  styleUrls: ['./cupon-diag.component.css'],
})
export class CuponDiagComponent implements OnInit {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();

  apertura: Date;
  cierre: Date;

  isAutenticated: boolean;
  currentUser: any;
  tipo: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CuponDiagComponent>,
    private gService: GenericService,
    private iService: ImageService,
    private authService: AuthenticationService,
    private notiService: NotificacionService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerCupon(this.datosDialog.id);
    }

    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    if (this.isAutenticated) {
      this.tipo = this.currentUser.tipoUsuario;
    }
  }

  obtenerCupon(id: number) {
    this.gService
      .get('cupon', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.iService
          .getImage({ filename: data.imagen })
          .pipe(takeUntil(this.destroy$))
          .subscribe((base64: any) => {
            data.base64 = base64.base64;
          });

        this.datos = data;
      });
  }

  onCanjear() {
    this.gService
      .get('usuario', this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        let billeteraDisponible: number = parseInt(
          usuario.billetera.disponibles
        );
        let monedasCupon: number = parseInt(this.datos.monedasCupon);

        if (monedasCupon <= billeteraDisponible) {
          let data = {
            billeteraId: usuario.billetera.id,
            cuponId: this.datos.id,
          };

          console.log(data);

          this.gService
            .create('canjeocupon', data)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
              console.log(response);

              if (response.error) {
                this.notiService.mensaje(
                  'Error',
                  'Error al Canjear Cupón',
                  TipoMessage.error
                );
              } else {
                this.notiService.mensaje(
                  'Cupón Canjeado',
                  'Cupón canjeado con exito',
                  TipoMessage.success
                );
                this.close();
              }
            });
        } else {
          this.notiService.mensaje(
            'Cuidado',
            'Cantidad de Eco-Monedas no disponible',
            TipoMessage.warning
          );
        }
      });
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
