import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponRoutingModule } from './cupon-routing.module';
import { CuponIndexComponent } from './cupon-index/cupon-index.component';
import { CuponDiagComponent } from './cupon-diag/cupon-diag.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CuponIndexComponent,
    CuponDiagComponent
  ],
  imports: [
    CommonModule,
    CuponRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class CuponModule { }
