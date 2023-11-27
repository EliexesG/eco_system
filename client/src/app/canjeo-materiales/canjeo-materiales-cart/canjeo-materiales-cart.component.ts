import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subject, concatMap, takeUntil } from 'rxjs';
import {
  CanjeoMaterialesService,
  canjeoMaterialesDetalle,
} from 'src/app/share/services/canjeo-materiales.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';
import { MatDialogRef } from '@angular/material/dialog';
import { formatHours } from 'src/app/share/utils/formater';

@Component({
  selector: 'app-canjeo-materiales-cart',
  templateUrl: './canjeo-materiales-cart.component.html',
  styleUrls: ['./canjeo-materiales-cart.component.css'],
})
export class CanjeoMaterialesCartComponent implements OnInit {
  private idCentro: number = 1;

  dataSource: MatTableDataSource<canjeoMaterialesDetalle>;
  total: number;
  cliente: any;
  centroAcopio: any;
  correo: string;

  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha = new Date();

  columns: string[] = ['material', 'cantidad', 'precio', 'subtotal'];

  constructor(
    private canjeoService: CanjeoMaterialesService,
    private gService: GenericService,
    private notiService: NotificacionService,
    private lService: LocalizacionService,
    private dialogRef: MatDialogRef<CanjeoMaterialesCartComponent>
  ) {}

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));

    this.gService
      .get('centroacopio', this.idCentro)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.centroAcopio = data;
      });
    this.dataSource = new MatTableDataSource<canjeoMaterialesDetalle>(
      this.canjeoService.getDetalles
    );
    this.total = this.canjeoService.getTotal;
  }

  actualizarTabla() {
    this.dataSource = new MatTableDataSource<canjeoMaterialesDetalle>(
      this.canjeoService.getDetalles
    );
    this.total = this.canjeoService.getTotal;
  }

  onCorreoChange(event) {
    this.correo = event.target.value;
  }

  onResetCliente() {
    this.cliente = null;
    localStorage.removeItem('cliente');
  }

  onResetCanjeo() {
    this.onResetCliente();
    this.canjeoService.vaciarCanjeoMateriales();
    this.actualizarTabla();
  }

  onCambioCantidad(detalle: any) {
    this.canjeoService.agregarDetalle(detalle);
    this.actualizarTabla();
    this.total = this.canjeoService.getTotal;
  }

  buscarCliente() {
    let obtenerCliente$ = this.gService
      .get('usuario/usuarioclientecorreo', this.correo)
      .pipe(
        takeUntil(this.destroy$),
        concatMap((usuario: any) => {
          if (usuario) {
            this.cliente = usuario;
            return this.lService.getProvincias().pipe(
              takeUntil(this.destroy$),
              concatMap((provincias: any) => {
                this.cliente['provincia'] = filtrarElementoByKey(
                  this.cliente.direccionUsuario.codProvincia,
                  provincias
                );

                return this.lService
                  .getCantonByPronvicia(
                    this.cliente.direccionUsuario.codProvincia
                  )
                  .pipe(
                    takeUntil(this.destroy$),
                    concatMap((cantones: any) => {
                      this.cliente['canton'] = filtrarElementoByKey(
                        this.cliente.direccionUsuario.codCanton,
                        cantones
                      );

                      return this.lService
                        .getDistritoByCantonYProvincia(
                          this.cliente.direccionUsuario.codProvincia,
                          this.cliente.direccionUsuario.codCanton
                        )
                        .pipe(
                          takeUntil(this.destroy$),
                          concatMap((distritos: any) => {
                            this.cliente['distrito'] = filtrarElementoByKey(
                              this.cliente.direccionUsuario.codDistrito,
                              distritos
                            );

                            localStorage.setItem(
                              'cliente',
                              JSON.stringify(this.cliente)
                            );
                            return EMPTY;
                          })
                        );
                    })
                  );
              })
            );
          } else {
            this.notiService.mensaje(
              'Cuidado',
              'Verifique que el correo sea de un cliente válido',
              TipoMessage.warning
            );
            return EMPTY;
          }
        })
      );

    obtenerCliente$.subscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}