import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanjeoMaterialesRoutingModule } from './canjeo-materiales-routing.module';
import { CanjeoMaterialesIndexComponent } from './canjeo-materiales-index/canjeo-materiales-index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CanjeoMaterialesDiagComponent } from './canjeo-materiales-diag/canjeo-materiales-diag.component';
import { MatTableModule } from '@angular/material/table';
import { CanjeoMaterialesDetalleComponent } from './canjeo-materiales-detalle/canjeo-materiales-detalle.component';
import { CanjeoMaterialesAllComponent } from './canjeo-materiales-all/canjeo-materiales-all.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    CanjeoMaterialesIndexComponent,
    CanjeoMaterialesDiagComponent,
    CanjeoMaterialesDetalleComponent,
    CanjeoMaterialesAllComponent,
  ],
  imports: [
    CommonModule,
    CanjeoMaterialesRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [CanjeoMaterialesIndexComponent],
})
export class CanjeoMaterialesModule {}
