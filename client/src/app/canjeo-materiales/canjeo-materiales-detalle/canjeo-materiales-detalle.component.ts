import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-canjeo-materiales-detalle',
  templateUrl: './canjeo-materiales-detalle.component.html',
  styleUrls: ['./canjeo-materiales-detalle.component.css'],
})
export class CanjeoMaterialesDetalleComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fecha: Date;

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

  formatHours(date: Date) {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'GMT',
    });
  }

  obtenerCanjeoMateriales(id: number) {
    this.gService
      .get(`canjeomateriales`, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.fecha = new Date(this.datos.fecha);
      });
  }

  devolverse() {
    this.router.navigate(['/canjeomateriales/all'], {
      relativeTo: this.route,
    });
  }
}
