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
import { CanjeoMaterialesCartComponent } from './canjeo-materiales-cart/canjeo-materiales-cart.component';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    CanjeoMaterialesIndexComponent,
    CanjeoMaterialesDiagComponent,
    CanjeoMaterialesDetalleComponent,
    CanjeoMaterialesAllComponent,
    CanjeoMaterialesCartComponent,
  ],
  imports: [
    CommonModule,
    CanjeoMaterialesRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    QRCodeModule,
    MatSortModule,
  ],
  exports: [CanjeoMaterialesIndexComponent],
})
export class CanjeoMaterialesModule {}
