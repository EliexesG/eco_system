import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';

@Component({
  selector: 'app-graficos-administrador',
  templateUrl: './graficos-administrador.component.html',
  styleUrls: ['./graficos-administrador.component.css'],
})
export class GraficosAdministradorComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  cantTotalCanjeMaterialesMes: any;
  estMonedasPorCentroAnno: any;
  sumMonedasCentro: any;
  cantCanjesCuponesAnno: any;
  totalMonedasCanjeCuponesAnno: any;

  constructor(private gService: GenericService) {}

  ngOnInit(): void {
    this.cargarDatosGraficos();
  }

  cargarDatosGraficos() {
    this.gService
      .list('canjeomateriales/cantidadmes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.cantTotalCanjeMaterialesMes = data;
      });

    this.gService
      .list('canjeomateriales/totalmonedasanno')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.estMonedasPorCentroAnno = data;
      });

    this.gService
      .list('canjeomateriales/totalmonedas')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.sumMonedasCentro = data;
      });

    this.gService
      .list('canjeocupon/totalcanjesanno')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.cantCanjesCuponesAnno = data;
      });

    this.gService
      .list('canjeocupon/totalmonedasanno')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.totalMonedasCanjeCuponesAnno = data;
      });
  }

  chartIsBuild(graphType: string) {
    var actualChart = Chart.getChart(graphType);
    return actualChart != undefined;
  }

  buildChart(graphType: string): void {
    if (this.chartIsBuild(graphType)) return;

    var graph;

    if (graphType == 'cantTotalCanjeMaterialesMes') {
      graph = new Chart('cantTotalCanjeMaterialesMes', {
        type: 'bar',
        data: {
          labels: [new Date().getFullYear()],
          datasets: [
            {
              label: 'Total',
              data: [this.cantTotalCanjeMaterialesMes.cantidad || 0],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'estMonedasPorCentroAnno') {
      graph = new Chart('estMonedasPorCentroAnno', {
        type: 'pie',
        data: {
          labels: this.estMonedasPorCentroAnno.map(
            (record: any) => record.centroAcopio
          ),
          datasets: [
            {
              label: 'Total',
              data: this.estMonedasPorCentroAnno.map(
                (record: any) => record.totalMonedas
              ),
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'sumMonedasCentro') {
      graph = new Chart('sumMonedasCentro', {
        type: 'pie',
        data: {
          labels: this.sumMonedasCentro.map(
            (record: any) => record.centroAcopio
          ),
          datasets: [
            {
              label: 'Total',
              data: this.sumMonedasCentro.map(
                (record: any) => record.totalMonedas
              ),
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'cantCanjesCuponesAnno') {
      graph = new Chart('cantCanjesCuponesAnno', {
        type: 'bar',
        data: {
          labels: [new Date().getFullYear()],
          datasets: [
            {
              label: 'Total',
              data: [this.cantCanjesCuponesAnno.totalCanjes || 0],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    } else if (graphType == 'totalMonedasCanjeCuponesAnno') {
      graph = new Chart('totalMonedasCanjeCuponesAnno', {
        type: 'bar',
        data: {
          labels: [new Date().getFullYear()],
          datasets: [
            {
              label: 'Total',
              data: [this.totalMonedasCanjeCuponesAnno.totalMonedas || 0],
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
