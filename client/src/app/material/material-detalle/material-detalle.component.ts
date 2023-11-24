import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-material-detalle',
  templateUrl: './material-detalle.component.html',
  styleUrls: ['./material-detalle.component.css'],
})
export class MaterialDetalleComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  datos: any;

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private iService: ImageService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerMaterial(Number(id));
    }
  }

  obtenerMaterial(id: number) {
    this.gService
      .get('material', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.iService
          .getImage({ filename: response.imagen })
          .pipe(takeUntil(this.destroy$))
          .subscribe((base64) => {
            if (!response) {
              this.redirigirError();
            }
            response.base64 = base64.base64;
            this.datos = response;
          });
      });
  }

  devolverse() {
    this.router.navigate(['/material/all'], {
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
