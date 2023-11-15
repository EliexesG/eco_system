import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-material-all',
  templateUrl: './material-all.component.html',
  styleUrls: ['./material-all.component.css'],
})
export class MaterialAllComponent implements AfterViewInit {

  datos: any;
  datosMateriales: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = [
    'nombre',
    'monedasUnidad',
    'unidadMedida',
    'color',
    'acciones',
  ];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.listarMaterial();
  }

  listarMaterial() {
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleMaterial(id: number) {
    this.router.navigate(['/material', id], {
      relativeTo: this.route,
    });
  }

  crearMaterial() {
    this.router.navigate(['/material/create'], {
      relativeTo: this.route,
    });
  }

  actualizarMaterial(id: number) {
    this.router.navigate(['/material/update', id], {
      relativeTo: this.route,
    });;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
