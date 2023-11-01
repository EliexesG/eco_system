import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-material-diag',
  templateUrl: './material-diag.component.html',
  styleUrls: ['./material-diag.component.css'],
})
export class MaterialDiagComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private gService: GenericService,
    private dialogRef: MatDialogRef<MaterialDiagComponent>
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerMaterial(this.datosDialog.id);
    }
  }

  obtenerMaterial(id: number) {
    this.gService
      .get('material', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
