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
import { MaterialAllComponent } from './material-all/material-all.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    MaterialDetalleComponent,
    MaterialIndexComponent,
    MaterialDiagComponent,
    MaterialAllComponent,
    MaterialFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatProgressSpinnerModule,
    NgxDropzoneModule,
  ],
})
export class MaterialModule {}
