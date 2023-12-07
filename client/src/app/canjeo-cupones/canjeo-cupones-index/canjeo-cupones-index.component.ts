import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { CanjeoCuponesDiagComponent } from '../canjeo-cupones-diag/canjeo-cupones-diag.component';
import { CuponDiagComponent } from 'src/app/cupon/cupon-diag/cupon-diag.component';

@Component({
  selector: 'app-canjeo-cupones-index',
  templateUrl: './canjeo-cupones-index.component.html',
  styleUrls: ['./canjeo-cupones-index.component.css']
})
export class CanjeoCuponesIndexComponent {
  datosBilletera: any;
  datosUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idUsuario: number = 5;

  columns: string[] = ['nombreCupon', 'fecha', 'cantidadMonedas','acciones'];

  cantidad: number=0;
  recibidos: number = 0;
  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.listarCanjeoCuponesForUsuario();
  }

  listarCanjeoCuponesForUsuario() {
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        this.gService
          .list(`canjeocupon/usuario/${usuario.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            console.log('Los datos de la billetera')
            console.log(response);
            this.datosBilletera = response;
          });

          this.gService
          .list(`usuario/${usuario.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            
            console.log('Los datos del cliente')
            console.log(response);
            this.datosUsuario = response;
            this.datosUsuario.billetera.recibidos = parseInt(this.datosUsuario.billetera.disponibles) + parseInt(this.datosUsuario.billetera.canjeados);
            
          });
      });
  }

  detalleCanjeoCupo(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(CanjeoCuponesDiagComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
