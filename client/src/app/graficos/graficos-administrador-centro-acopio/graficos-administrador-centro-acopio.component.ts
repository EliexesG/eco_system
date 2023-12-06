import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/services/generic.service';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficos-administrador-centro-acopio',
  templateUrl: './graficos-administrador-centro-acopio.component.html',
  styleUrls: ['./graficos-administrador-centro-acopio.component.css'],
})
export class GraficosAdministradorCentroAcopioComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  cantCanjesMaterialesMes: any;
  cantCanjesPorMaterialAnno: any;
  totalMonedasCentro: any;

  dataCentro: any = null;

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: any) => {
        console.log(usuario);

        this.gService
          .list(`centroacopio/usuario/${usuario.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((centro: any) => {
            if (centro) {
              this.dataCentro = centro;

              this.gService
                .list(
                  `canjeomateriales/cantidadmes/centroacopio/${this.dataCentro.id}`
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: any) => {
                  console.log(data);
                  this.cantCanjesMaterialesMes = data;
                });

              this.gService
                .list(
                  `canjeomateriales/cantidadanno/centroacopio/${this.dataCentro.id}`
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: any) => {
                  console.log(data);
                  this.cantCanjesPorMaterialAnno = data;
                });

              this.gService
                .list(
                  `canjeomateriales/totalmonedas/centroacopio/${this.dataCentro.id}`
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: any) => {
                  console.log(data);
                  this.totalMonedasCentro = data;
                });
            }
          });
      });
  }

  chartIsBuild(graphType: string) {
    var actualChart = Chart.getChart(graphType);
    return actualChart != undefined;
  }

  buildChart(graphType: string): void {
    if (this.chartIsBuild(graphType)) return;

    var graph;

    if (graphType == 'cantCanjesMaterialesMes') {
      graph = new Chart('cantCanjesMaterialesMes', {
        type: 'bar',
        data: {
          labels: [new Date().getFullYear()],
          datasets: [
            {
              label: 'Total',
              data: [this.cantCanjesMaterialesMes.cantidad || 0],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'cantCanjesPorMaterialAnno') {
      graph = new Chart('cantCanjesPorMaterialAnno', {
        type: 'pie',
        data: {
          labels: this.cantCanjesPorMaterialAnno.map(
            (record: any) => record.material
          ),
          datasets: [
            {
              label: 'Total',
              data: this.cantCanjesPorMaterialAnno.map(
                (record: any) => record.cantidadUnidades
              ),
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'totalMonedasCentro') {
      graph = new Chart('totalMonedasCentro', {
        type: 'bar',
        data: {
          labels: [new Date().getFullYear()],
          datasets: [
            {
              label: 'Total',
              data: [this.totalMonedasCentro.totalMonedas],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }
}
