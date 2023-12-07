import { Component } from '@angular/core';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/services/generic.service';
import { ImageService } from 'src/app/share/services/image.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private iService: ImageService
  ) {
    this.listarMateriales();
  }

  listarMateriales() {
    
    let materiales$ = this.gService.list('material').pipe(
      takeUntil(this.destroy$),
      switchMap((materiales: any) => {
        materiales.map((material: any) => {
          this.iService
            .getImage({filename: material.imagen})
            .pipe(takeUntil(this.destroy$))
            .subscribe((base64) => {
              material.base64 = base64.base64;
            });
        });

        this.datos = materiales.slice(0, 6);

        return EMPTY;
      })
    );

    materiales$.subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
