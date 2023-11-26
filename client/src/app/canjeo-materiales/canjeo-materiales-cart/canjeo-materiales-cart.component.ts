import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import {
  CanjeoMaterialesService,
  canjeoMaterialesDetalle,
} from 'src/app/share/services/canjeo-materiales.service';
import { GenericService } from 'src/app/share/services/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/services/notification.service';

@Component({
  selector: 'app-canjeo-materiales-cart',
  templateUrl: './canjeo-materiales-cart.component.html',
  styleUrls: ['./canjeo-materiales-cart.component.css'],
})
export class CanjeoMaterialesCartComponent implements OnInit {
  private idCentro: number = 1;

  dataSource: MatTableDataSource<canjeoMaterialesDetalle>;
  cliente: any;
  centroAcopio: any;
  correo: string;

  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha = Date.now();

  columns: string[] = ['material', 'cantidad', 'precio', 'subtotal'];

  constructor(
    private canjeoService: CanjeoMaterialesService,
    private gService: GenericService,
    private notiService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));

    this.gService
      .get('centroacopio', this.idCentro)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.centroAcopio = data;
      });
    this.dataSource = new MatTableDataSource<canjeoMaterialesDetalle>(
      this.canjeoService.getDetalles
    );
    console.log(this.dataSource);
  }

  onCorreoChange(event) {
    this.correo = event.target.value;
  }

  onResetCliente() {
    this.cliente = null;
    localStorage.removeItem('cliente');
  }

  buscarCliente() {
    this.gService
      .get('usuario/usuarioclientecorreo', this.correo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data) {
          this.cliente = data;
          localStorage.setItem('cliente', JSON.stringify(this.cliente));
        } else {
          this.notiService.mensaje(
            'Cuidado',
            'Verifique que el correo sea de un cliente válido',
            TipoMessage.warning
          );
        }
      });
  }
}
