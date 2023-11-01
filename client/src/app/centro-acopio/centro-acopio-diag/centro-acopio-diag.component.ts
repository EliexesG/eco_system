import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizacionService } from 'src/app/share/localizacion.service';

@Component({
  selector: 'app-centro-acopio-diag',
  templateUrl: './centro-acopio-diag.component.html',
  styleUrls: ['./centro-acopio-diag.component.css'],
})
export class CentroAcopioDiagComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  apertura: Date;
  cierre: Date;

  provincia: string;
  canton: string;
  distrito: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CentroAcopioDiagComponent>,
    private gService: GenericService,
    private lService: LocalizacionService
  ) {
    this.datosDialog = data;
  }

  private filtrarElementoByKey(
    cod: number,
    elementos: { [key: number]: string }
  ) {
    let elemento = Object.entries(elementos).find(([key, value]) => {
      return Number(key) === cod;
    });

    if (!elemento) {
      return undefined;
    } else {
      return elemento[1];
    }
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerCentroAcopio(this.datosDialog.id);
    }
  }
  obtenerCentroAcopio(id: any) {
    this.gService
      .get('centroacopio', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;

        this.lService
          .getProvincias()
          .pipe(takeUntil(this.destroy$))
          .subscribe((provincias) => {
            this.provincia = this.filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codProvincia,
              provincias
            );
          });

        this.lService
          .getCantonByPronvicia(this.datos.direccionCentroAcopio.codProvincia)
          .pipe(takeUntil(this.destroy$))
          .subscribe((cantones) => {
            this.canton = this.filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codCanton,
              cantones
            );
          });

        this.lService
          .getDistritoByCantonYProvincia(
            this.datos.direccionCentroAcopio.codProvincia,
            this.datos.direccionCentroAcopio.codCanton
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe((distritos) => {
            this.distrito = this.filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codDistrito,
              distritos
            );
          });
      });
  }
  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
