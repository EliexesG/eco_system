import { Component } from '@angular/core';
import { EMPTY, Subject, concatMap, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialDiagComponent } from '../material-diag/material-diag.component';
import { ImageService } from 'src/app/share/services/image.service';
import { AuthenticationService } from 'src/app/share/services/authentication.service';

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
  tipoUsuario: string = '';

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private iService: ImageService,
    private authService: AuthenticationService
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
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        console.log(usuario);

        if(!usuario) {
          return;
        }

        this.tipoUsuario = usuario.tipoUsuario;

        if (usuario.tipoUsuario == 'ADMINISTRADOR_CENTROS_ACOPIO') {
          this.gService
            .list(`centroacopio/usuario/${usuario.id}`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((centro: any) => {
              this.materialesCentroAcopio = centro.materiales;
              console.log(this.materialesCentroAcopio);
            });
        }
        else {
          this.materialesCentroAcopio = [];
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
