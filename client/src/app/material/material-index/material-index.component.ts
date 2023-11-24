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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private iService: ImageService
  ) {
    this.listarMateriales();
  }

  listarMateriales() {
    let materiales$ = this.gService.list('material').pipe(
      takeUntil(this.destroy$),
      switchMap((materiales: any) => {
        materiales.map((material: any) => {
          this.iService
            .getImage({filename: material.imagen})
            .pipe(takeUntil(this.destroy$))
            .subscribe((base64) => {
              console.log(base64)
              material.base64 = base64.base64;
            });
        });

        this.datos = materiales;

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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
