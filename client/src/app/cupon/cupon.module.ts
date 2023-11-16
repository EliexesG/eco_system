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
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CuponFormComponent } from './cupon-form/cupon-form.component';
import { CuponAllComponent } from './cupon-all/cupon-all.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CuponIndexComponent,
    CuponDiagComponent,
    CuponFormComponent,
    CuponAllComponent
  ],
  imports: [
    CommonModule,
    CuponRoutingModule,
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
    NgxMatFileInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule]
})
export class CuponModule { }
