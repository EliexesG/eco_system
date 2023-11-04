import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { formatHours } from 'src/app/share/utils/formater';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';

@Component({
  selector: 'app-centro-acopio-diag',
  templateUrl: './centro-acopio-diag.component.html',
  styleUrls: ['./centro-acopio-diag.component.css'],
})
export class CentroAcopioDiagComponent implements OnInit {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();

  apertura: string;
  cierre: string;

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

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerCentroAcopio(this.datosDialog.id);
    }
  }

  obtenerCentroAcopio(id: number) {
    this.gService
      .get('centroacopio', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;

        this.apertura = formatHours(new Date(this.datos.horarios.horaInicio));
        this.cierre = formatHours(new Date(this.datos.horarios.horaCierre));

        console.log(this.apertura, this.cierre);

        this.lService
          .getProvincias()
          .pipe(takeUntil(this.destroy$))
          .subscribe((provincias) => {
            this.provincia = filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codProvincia,
              provincias
            );
          });

        this.lService
          .getCantonByPronvicia(this.datos.direccionCentroAcopio.codProvincia)
          .pipe(takeUntil(this.destroy$))
          .subscribe((cantones) => {
            this.canton = filtrarElementoByKey(
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
            this.distrito = filtrarElementoByKey(
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
