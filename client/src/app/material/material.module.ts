import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialRoutingModule } from './material-routing.module';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialDiagComponent } from './material-diag/material-diag.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MaterialDetalleComponent, MaterialIndexComponent, MaterialDiagComponent],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class MaterialModule {}
