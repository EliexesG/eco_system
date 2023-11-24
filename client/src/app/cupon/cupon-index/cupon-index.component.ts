import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { CuponDiagComponent } from '../cupon-diag/cupon-diag.component';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-cupon-index',
  templateUrl: './cupon-index.component.html',
  styleUrls: ['./cupon-index.component.css'],
})
export class CuponIndexComponent {
  datos: any;
  datosShow: any;
  categorias: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private iService: ImageService
  ) {
    this.listarCentrosAcopio();
  }

  listarCentrosAcopio() {
    let cupones$ = this.gService.list('cupon/validos').pipe(
      takeUntil(this.destroy$),
      switchMap((cupones: any) => {
        cupones.map((cupon: any) => {
          this.iService
            .getImage({ filename: cupon.imagen })
            .pipe(takeUntil(this.destroy$))
            .subscribe((base64) => {
              cupon.base64 = base64.base64;
            });
        });

        this.datos = cupones;
        this.datosShow = { categoria: 'TODOS', cupones: cupones };
        this.categorias = [
          ...new Set(cupones.map((cupon: any) => cupon.categoria)),
        ];
        console.log(this.categorias);

        return EMPTY;
      })
    );

    cupones$.subscribe();
  }

  onCategoriaChange(event) {
    
    this.datosShow.categoria = event;

    if(event === "TODOS") {
      this.datosShow.cupones = this.datos;
    }
    else {
      this.datosShow.cupones = this.datos.filter((cupon: any) => cupon.categoria === event);
    }

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
