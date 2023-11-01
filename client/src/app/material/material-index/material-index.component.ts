import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-index',
  templateUrl: './material-index.component.html',
  styleUrls: ['./material-index.component.css'],
})
export class MaterialIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listarMateriales();
  }

  listarMateriales() {
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
      });
  }

  detalleMaterial(id: number) {
    this.router.navigate(['/material', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
