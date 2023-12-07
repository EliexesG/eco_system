import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { formatHours } from 'src/app/share/utils/formater';

@Component({
  selector: 'app-canjeo-cupones-diag',
  templateUrl: './canjeo-cupones-diag.component.html',
  styleUrls: ['./canjeo-cupones-diag.component.css'],
})
export class CanjeoCuponesDiagComponent {
  datos: any;
  datosDialog: { id: number };
  datosTabla: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha: string;
  qrdata: string;

  columns: string[] = ['cupon', 'fechaInicio', 'fechaFin', 'subtotal'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CanjeoCuponesDiagComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      console.log(this.datosDialog.id);
      this.obtenerCanjeoCupon(this.datosDialog.id);
    }
  }

  obtenerCanjeoCupon(id: number) {
    this.gService
      .get(`canjeocupon`, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.datosTabla = [this.datos.cupon]
        this.fecha = formatHours(new Date(this.datos.fecha));
        this.qrdata = JSON.stringify(this.datos.id);
      });
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
