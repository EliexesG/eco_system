import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';

@Component({
  selector: 'app-usuario-all',
  templateUrl: './usuario-all.component.html',
  styleUrls: ['./usuario-all.component.css'],
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
    'estado',
    'acciones',
  ];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  crearUsuario() {
    this.router.navigate(['/usuario/create'], {
      relativeTo: this.route,
    });
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['/usuario/update', id], {
      relativeTo: this.route,
      skipLocationChange: true,
    });
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
        this.datos = response.filter(
          (usuario: any) => usuario.tipoUsuario != 'ADMINISTRADO'
        );
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cambiarEstado(id: number) {
    this.gService
      .create(`usuario/habilitarodesabilitar/${id}`, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.listarUsuario();
      });
  }

  detalleUsuario(id:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = id;
    this.dialog.open(UsuarioDetalleComponent, dialogConfig);
  }
}
