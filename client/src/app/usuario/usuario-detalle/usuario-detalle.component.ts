import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
})
export class UsuarioDetalleComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  data: any;

  provincia: string;
  canton: string;
  distrito: string;

  idUsuario: number = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) dialogData,
    private authService: AuthenticationService,
    private gService: GenericService,
    private dialogRef: DialogRef,
    private lService: LocalizacionService
  ) {
    this.idUsuario = dialogData;
  }

  ngOnInit(): void {
    this.loadUsuario();
  }

  loadUsuario() {
    if (this.idUsuario == -1) {
      this.authService.decodeToken
        .pipe(takeUntil(this.destroy$))
        .subscribe((token: any) => {
          console.log(token);

          this.gService
            .get('usuario', token.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((usuario) => {
              console.log(usuario);
              this.data = usuario;
              this.loadDireccion();
            });
        });
    } else {
      this.gService
        .get('usuario', this.idUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe((usuario) => {
          console.log(usuario);
          this.data = usuario;
          this.loadDireccion();
        });
    }
  }

  loadDireccion() {
    this.lService
      .getProvincias()
      .pipe(takeUntil(this.destroy$))
      .subscribe((provincias) => {
        this.provincia = filtrarElementoByKey(
          this.data.direccionUsuario.codProvincia,
          provincias
        );
        console.log(this.provincia)
      });

    this.lService
      .getCantonByPronvicia(this.data.direccionUsuario.codProvincia)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cantones) => {
        this.canton = filtrarElementoByKey(
          this.data.direccionUsuario.codCanton,
          cantones
        );
        console.log(this.canton)
      });

    this.lService
      .getDistritoByCantonYProvincia(
        this.data.direccionUsuario.codProvincia,
        this.data.direccionUsuario.codCanton
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((distritos) => {
        this.distrito = filtrarElementoByKey(
          this.data.direccionUsuario.codDistrito,
          distritos
        );
        console.log(this.distrito)
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
