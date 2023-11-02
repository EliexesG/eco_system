import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { CuponDiagComponent } from '../cupon-diag/cupon-diag.component';

@Component({
  selector: 'app-cupon-index',
  templateUrl: './cupon-index.component.html',
  styleUrls: ['./cupon-index.component.css'],
})
export class CuponIndexComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private dialog: MatDialog) {
    this.listarCentrosAcopio();
  }

  listarCentrosAcopio() {
    //Solicitud al API para listar todos los centro de acopio
    //localhost:3000/centrosacopio
    this.gService
      .list('cupon/validos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        
        console.log(response);

        let data: Array<{ categoria: string; cupones: any }> = [];
        let usedCategorias: Array<string> = [];

        response.forEach((cupon: any) => {
          if (!usedCategorias.includes(cupon.categoria)) {
            usedCategorias.push(cupon.categoria);
            let cupones = response.filter(
              (element: any) => element.categoria === cupon.categoria
            );
            data.push({
              categoria: cupon.categoria.toLowerCase(),
              cupones: cupones,
            });
          }
        });

        data = data.sort((a, b) => {
          const categoriaA = a.categoria.toUpperCase();
          const categoriaB = b.categoria.toUpperCase();
          if (categoriaA < categoriaB) {
            return -1;
          }
          if (categoriaA > categoriaB) {
            return 1;
          }
          return 0;
        });

        console.log(data);

        this.datos = data;
      });
  }

  detalleCupon(id: number) {
    //Detalle en formato diálogo
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(CuponDiagComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
