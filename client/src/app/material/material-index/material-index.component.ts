import { Component } from '@angular/core';
import { EMPTY, Subject, concatMap, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialDiagComponent } from '../material-diag/material-diag.component';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-material-index',
  templateUrl: './material-index.component.html',
  styleUrls: ['./material-index.component.css'],
})
export class MaterialIndexComponent {
  datos: any;
  datosShow: { vista: string; materiales };
  destroy$: Subject<boolean> = new Subject<boolean>();
  idCentroAcopio: number = 2;
  materialesCentroAcopio = [];

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private iService: ImageService
  ) {
    this.listarMateriales();
    this.obtenerMaterialesCentroAcopio();
  }

  onVistaChange(event) {
    this.datosShow.vista = event;

    if (event === 'TODOS') {
      this.datosShow.materiales = this.datos;
    } else {
      console.log(this.materialesCentroAcopio, this.datos);

      this.datosShow.materiales = this.datos.filter(
        (material: any) =>
          this.materialesCentroAcopio.findIndex(
            (materialCentro) => materialCentro.id == material.id
          ) != -1
      );
      console.log(this.datosShow.materiales);
    }
  }

  listarMateriales() {
    let materiales$ = this.gService.list('material').pipe(
      takeUntil(this.destroy$),
      switchMap((materiales: any) => {
        materiales.map((material: any) => {
          this.iService
            .getImage({ filename: material.imagen })
            .pipe(takeUntil(this.destroy$))
            .subscribe((base64) => {
              material.base64 = base64.base64;
            });
        });

        this.datos = materiales;
        this.datosShow = { vista: 'TODOS', materiales: materiales };

        return EMPTY;
      })
    );

    materiales$.subscribe();
  }

  detalleMaterial(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(MaterialDiagComponent, dialogConfig);
  }

  obtenerMaterialesCentroAcopio() {
    this.gService
      .get('centroacopio', this.idCentroAcopio)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.materialesCentroAcopio = data.materiales;
        console.log(this.materialesCentroAcopio);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
