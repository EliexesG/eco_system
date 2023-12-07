import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { formatHours } from 'src/app/share/utils/formater';

@Component({
  selector: 'app-canjeo-materiales-detalle',
  templateUrl: './canjeo-materiales-detalle.component.html',
  styleUrls: ['./canjeo-materiales-detalle.component.css'],
})
export class CanjeoMaterialesDetalleComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha: string;
  qrdata: string;

  columns: string[] = ['material', 'cantidad', 'precio', 'subtotal'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerCanjeoMateriales(Number(id));
    }
  }

  obtenerCanjeoMateriales(id: number) {
    this.gService
      .get(`canjeomateriales`, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);

        if (!data) {
          this.redirigirError();
        }

        this.datos = data;
        this.fecha = formatHours(new Date(this.datos.fecha));
        this.qrdata = JSON.stringify(this.datos.id);
      });
  }

  devolverse() {
    this.router.navigate(['/canjeomateriales/all'], {
      relativeTo: this.route,
    });
  }

  redirigirError() {
    this.router.navigate(['/page-not-found/'], {
      relativeTo: this.route,
    });
  }
}
