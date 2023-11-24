import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-cupon-diag',
  templateUrl: './cupon-diag.component.html',
  styleUrls: ['./cupon-diag.component.css'],
})
export class CuponDiagComponent implements OnInit {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();

  apertura: Date;
  cierre: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<CuponDiagComponent>,
    private gService: GenericService,
    private iService: ImageService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerCupon(this.datosDialog.id);
    }
  }
  obtenerCupon(id: number) {
    this.gService
      .get('cupon', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.iService
          .getImage({ filename: data.imagen })
          .pipe(takeUntil(this.destroy$))
          .subscribe((base64: any) => {
            data.base64 = base64.base64;
          });

        this.datos = data;
      });
  }
  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
