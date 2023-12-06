import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { CanjeoMaterialesDiagComponent } from '../canjeo-materiales-diag/canjeo-materiales-diag.component';
import { AuthenticationService } from 'src/app/share/services/authentication.service';

@Component({
  selector: 'app-canjeo-materiales-index',
  templateUrl: './canjeo-materiales-index.component.html',
  styleUrls: ['./canjeo-materiales-index.component.css'],
})
export class CanjeoMaterialesIndexComponent {
  datos: any;
  datosUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idUsuario: number = 5;

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.listarCanjeoMaterialesForUsuario();
  }

  listarCanjeoMaterialesForUsuario() {
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        this.gService
          .list(`canjeomateriales/usuario/${usuario.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            console.log(response);

            let data: { totalMonedas: number; canjeos: any } = {
              totalMonedas: 0,
              canjeos: response,
            };
            response.forEach((canjeo) => {
              data.totalMonedas += canjeo.cantMonedas;
            });

            this.datos = data;
          });

        this.gService
          .list(`usuario/${usuario.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            console.log(response);
            this.datosUsuario = response;
          });
      });
  }

  detalleCanjeoMateriales(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(CanjeoMaterialesDiagComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
