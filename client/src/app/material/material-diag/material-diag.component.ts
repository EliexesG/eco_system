import { Component, Inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/share/services/image.service';
import { CanjeoMaterialesService } from 'src/app/share/services/canjeo-materiales.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { AuthenticationService } from 'src/app/share/services/authentication.service';

@Component({
  selector: 'app-material-diag',
  templateUrl: './material-diag.component.html',
  styleUrls: ['./material-diag.component.css'],
})
export class MaterialDiagComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosDialog: { id: number };
  esCanjeable: boolean = false;
  idCentroAcopio: number = 2;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private gService: GenericService,
    private dialogRef: MatDialogRef<MaterialDiagComponent>,
    private iService: ImageService,
    private canjeoService: CanjeoMaterialesService,
    private notiService: NotificacionService,
    private authService: AuthenticationService
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
        this.iService
          .getImage({ filename: response.imagen })
          .pipe(takeUntil(this.destroy$))
          .subscribe((base64) => {
            response.base64 = base64.base64;
            this.datos = response;
            this.identificarCanjeabilidad();
          });
      });
  }

  identificarCanjeabilidad() {
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        console.log(usuario);
        if(!usuario) {
          this.esCanjeable = false;
          return;
        }

        if (usuario?.tipoUsuario == 'ADMINISTRADOR_CENTROS_ACOPIO') {
          this.gService
            .list(`centroacopio/usuario/${usuario.id}`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((centro: any) => {
              this.esCanjeable =
                centro.materiales.findIndex(
                  (material: any) => this.datos.id === material.id
                ) != -1;
              console.log(this.esCanjeable);
            });
        } else {
          this.esCanjeable = false;
        }
      });
  }

  onCanjeo() {
    this.canjeoService.agregarDetalle(this.datos);
    this.notiService.mensaje(
      'Canjeo',
      'Material agregado al canjeo',
      TipoMessage.success
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
