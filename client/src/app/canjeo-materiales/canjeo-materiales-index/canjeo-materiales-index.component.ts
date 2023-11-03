import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-canjeo-materiales-index',
  templateUrl: './canjeo-materiales-index.component.html',
  styleUrls: ['./canjeo-materiales-index.component.css'],
})
export class CanjeoMaterialesIndexComponent {
  datos: any;
  datosUsuario: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idUsuario: number = 5;

  constructor(private gService: GenericService, private dialog: MatDialog) {
    this.listarCanjeoMaterialesForUsuario();
  }

  listarCanjeoMaterialesForUsuario() {
    this.gService
      .list(`canjeomateriales/usuario/${this.idUsuario}`)
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
      });

    this.gService
      .list(`usuario/${this.idUsuario}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datosUsuario = response;
      });

    this.gService;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
