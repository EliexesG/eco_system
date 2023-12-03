import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GenericService } from 'src/app/share/services/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuario-all',
  templateUrl: './usuario-all.component.html',
  styleUrls: ['./usuario-all.component.css']
})
export class UsuarioAllComponent implements AfterViewInit {
  
  datos: any;
  datosMateriales: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = [
    'nombre',
    'identificacion',
    'correo',
    'tipoUsuario',
    'acciones',
  ];

  
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  detalleUsuario(id: number) {
    this.router.navigate(['/usuario', id], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuario/create'], {
      relativeTo: this.route,
    });
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['/usuario/update', id], {
      relativeTo: this.route,
      skipLocationChange: true
    });;
  }

  ngAfterViewInit(): void {
    this.listarUsuario();
  }

  listarUsuario() {
    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
