import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-canjeo-materiales-all',
  templateUrl: './canjeo-materiales-all.component.html',
  styleUrls: ['./canjeo-materiales-all.component.css'],
})
export class CanjeoMaterialesAllComponent implements AfterViewInit {
  datos: any;
  datosCentroAcopio: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idCentroAcopio: number = 2;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = ['fecha', 'ecomonedas', 'acciones'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.listarCanjeoMateriales();
  }

  listarCanjeoMateriales() {
    this.gService
      .list(`canjeomateriales/centroacopio/${this.idCentroAcopio}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);

        let data: { totalMonedas: number; canjeos: any } = {
          totalMonedas: 0,
          canjeos: response,
        };
        response.forEach((canjeo) => {
          data.totalMonedas += canjeo.cantMonedas;
        });

        this.datos = data;

        this.dataSource = new MatTableDataSource(this.datos.canjeos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    this.gService
      .list(`centroacopio/${this.idCentroAcopio}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datosCentroAcopio = response;
      });
  }

  detalleCanjeoMateriales(id: number) {
    this.router.navigate(['/canjeomateriales', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
