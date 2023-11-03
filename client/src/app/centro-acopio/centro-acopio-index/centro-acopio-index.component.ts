import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { CentroAcopioDiagComponent } from '../centro-acopio-diag/centro-acopio-diag.component';

@Component({
  selector: 'app-centro-acopio-index',
  templateUrl: './centro-acopio-index.component.html',
  styleUrls: ['./centro-acopio-index.component.css'],
})
export class CentroAcopioIndexComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private dialog: MatDialog) {
    this.listarCentrosAcopio();
  }

  listarCentrosAcopio() {
    //Solicitud al API para listar todos los centro de acopio
    //localhost:3000/centrosacopio
    this.gService
      .list('centroacopio/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
      });
  }

  detalleCentroAcopio(id: number) {
    //Detalle en formato diálogo
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(CentroAcopioDiagComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
