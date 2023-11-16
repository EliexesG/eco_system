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
import { MatButtonModule } from '@angular/material/button';
import { CentroAcopioAllComponent } from './centro-acopio-all/centro-acopio-all.component';
import { CentroAcopioFormComponent } from './centro-acopio-form/centro-acopio-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    CentroAcopioDetalleComponent,
    CentroAcopioIndexComponent,
    CentroAcopioDiagComponent,
    CentroAcopioAllComponent,
    CentroAcopioFormComponent,
  ],
  imports: [
    CommonModule,
    CentroAcopioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    NgxMatFileInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
  ],
})
export class CentroAcopioModule {}
