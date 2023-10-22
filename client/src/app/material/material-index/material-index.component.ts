import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-material-index',
  templateUrl: './material-index.component.html',
  styleUrls: ['./material-index.component.css']
})
export class MaterialIndexComponent {
  
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor (private gService: GenericService) {
    this.listarMateriales();
  } 

  listarMateriales() {
    this.gService
        .list('material')
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          console.log(response);
          this.datos = response;
        })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
