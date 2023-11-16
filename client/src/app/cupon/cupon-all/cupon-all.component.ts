import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/services/generic.service';

@Component({
  selector: 'app-cupon-all',
  templateUrl: './cupon-all.component.html',
  styleUrls: ['./cupon-all.component.css'],
})
export class CuponAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = [
    'nombre',
    'monedasUnidad',
    'categoria',
    'fechaVigencia',
    'acciones',
  ];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.listarCupones();
  }
  listarCupones() {
    this.gService
      .list('cupon/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  detalleCupon(id: number) {
    this.router.navigate(['/cupon', id], {
      relativeTo: this.route,
    });
  }
  actualizarCupon(id: number) {
    this.router.navigate(['/cupon/update', id], {
      relativeTo: this.route,
    });
  }

  crearCupon() {
    this.router.navigate(['/cupon/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
