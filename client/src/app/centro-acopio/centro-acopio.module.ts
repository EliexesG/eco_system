import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroAcopioRoutingModule } from './centro-acopio-routing.module';
import { CentroAcopioDetalleComponent } from './centro-acopio-detalle/centro-acopio-detalle.component';
import { CentroAcopioIndexComponent } from './centro-acopio-index/centro-acopio-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CentroAcopioDiagComponent } from './centro-acopio-diag/centro-acopio-diag.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CentroAcopioDetalleComponent, CentroAcopioIndexComponent, CentroAcopioDiagComponent],
  imports: [
    CommonModule,
    CentroAcopioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
})
export class CentroAcopioModule {}
