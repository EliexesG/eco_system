import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-canjeo-materiales-diag',
  templateUrl: './canjeo-materiales-diag.component.html',
  styleUrls: ['./canjeo-materiales-diag.component.css'],
})
export class CanjeoMaterialesDiagComponent implements OnInit {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha: Date;

  columns: string[] = ['material', 'cantidad', 'precio', 'subtotal'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CanjeoMaterialesDiagComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  formatHours(date: Date) {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'GMT',
    });
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      console.log(this.datosDialog.id);
      this.obtenerCanjeoMateriales(this.datosDialog.id);
    }
  }

  obtenerCanjeoMateriales(id: number) {
    this.gService
      .get(`canjeomateriales`, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.fecha = new Date(this.datos.fecha);
      });
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
