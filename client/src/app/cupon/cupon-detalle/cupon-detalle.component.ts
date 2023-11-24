import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/services/generic.service';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-cupon-detalle',
  templateUrl: './cupon-detalle.component.html',
  styleUrls: ['./cupon-detalle.component.css'],
})
export class CuponDetalleComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private iService: ImageService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerCupon(Number(id));
    }
  }

  obtenerCupon(id: number) {
    this.gService
      .get('cupon', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.iService
          .getImage({ filename: data.imagen })
          .pipe(takeUntil(this.destroy$))
          .subscribe((base64: any) => {
            if (!data) {
              this.redirigirError();
            }
            data.base64 = base64.base64;
            this.datos = data;
          });
      });
  }

  devolverse() {
    this.router.navigate(['/cupon/all'], {
      relativeTo: this.route,
    });
  }

  redirigirError() {
    this.router.navigate(['/page-not-found/'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
