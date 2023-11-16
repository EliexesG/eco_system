import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';

@Component({
  selector: 'app-centro-acopio-all',
  templateUrl: './centro-acopio-all.component.html',
  styleUrls: ['./centro-acopio-all.component.css'],
})
export class CentroAcopioAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = ['nombre', 'adminstrador', 'telefono', 'estado', 'acciones'];

  provincia: string;
  canton: string;
  distrito: string;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private lService: LocalizacionService
  ) {}

  ngAfterViewInit(): void {
    this.listarCentros();
  }

  listarCentros() {
    this.gService
      .list('centroacopio/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleCentro(id: number) {
    this.router.navigate(['/centroacopio', id], {
      relativeTo: this.route,
    });
  }

  actualizarCentro(id: number) {
    this.router.navigate(['/centroacopio/update', id], {
      relativeTo: this.route,
    });
  }

  crearCentro() {
    this.router.navigate(['/centroacopio/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
