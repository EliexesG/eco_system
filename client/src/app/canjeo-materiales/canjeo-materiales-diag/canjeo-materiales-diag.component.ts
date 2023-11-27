import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CanjeoMaterialesService } from 'src/app/share/services/canjeo-materiales.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { formatHours } from 'src/app/share/utils/formater';

@Component({
  selector: 'app-canjeo-materiales-diag',
  templateUrl: './canjeo-materiales-diag.component.html',
  styleUrls: ['./canjeo-materiales-diag.component.css'],
})
export class CanjeoMaterialesDiagComponent implements OnInit {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha: string;

  columns: string[] = ['material', 'cantidad', 'precio', 'subtotal'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CanjeoMaterialesDiagComponent>,
    private gService: GenericService,
  ) {
    this.datosDialog = data;
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
        this.fecha = formatHours(new Date(this.datos.fecha));
      });
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
