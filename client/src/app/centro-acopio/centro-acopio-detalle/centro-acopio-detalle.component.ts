import { Component, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { LocalizacionService } from 'src/app/share/services/localizacion.service';
import { formatHours } from 'src/app/share/utils/formater';
import { filtrarElementoByKey } from 'src/app/share/utils/arrayUtils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-centro-acopio-detalle',
  templateUrl: './centro-acopio-detalle.component.html',
  styleUrls: ['./centro-acopio-detalle.component.css']
})
export class CentroAcopioDetalleComponent {
  datos: any;
  datosDialog: { id: number };
  destroy$: Subject<boolean> = new Subject<boolean>();

  apertura: string;
  cierre: string;

  provincia: string;
  canton: string;
  distrito: string;

  constructor(
    private gService: GenericService,
    private lService: LocalizacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerCentroAcopio(Number(id));
    }
  }

  obtenerCentroAcopio(id: number) {
    this.gService
      .get('centroacopio', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;

        if(!data) {
          this.redirigirError();
        }

        this.apertura = formatHours(new Date(this.datos.horarios.horaInicio));
        this.cierre = formatHours(new Date(this.datos.horarios.horaCierre));

        console.log(this.apertura, this.cierre);

        this.lService
          .getProvincias()
          .pipe(takeUntil(this.destroy$))
          .subscribe((provincias) => {
            this.provincia = filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codProvincia,
              provincias
            );
          });

        this.lService
          .getCantonByPronvicia(this.datos.direccionCentroAcopio.codProvincia)
          .pipe(takeUntil(this.destroy$))
          .subscribe((cantones) => {
            this.canton = filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codCanton,
              cantones
            );
          });

        this.lService
          .getDistritoByCantonYProvincia(
            this.datos.direccionCentroAcopio.codProvincia,
            this.datos.direccionCentroAcopio.codCanton
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe((distritos) => {
            this.distrito = filtrarElementoByKey(
              this.datos.direccionCentroAcopio.codDistrito,
              distritos
            );
          });
      });
  }
  
  devolverse() {
    this.router.navigate(['/centroacopio/all'], {
      relativeTo: this.route,
    });
  }

  redirigirError() {
    this.router.navigate(['/page-not-found/'], {
      relativeTo: this.route,
    });
  }
}
