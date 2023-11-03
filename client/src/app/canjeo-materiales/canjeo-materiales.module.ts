import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanjeoMaterialesRoutingModule } from './canjeo-materiales-routing.module';
import { CanjeoMaterialesIndexComponent } from './canjeo-materiales-index/canjeo-materiales-index.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CanjeoMaterialesIndexComponent],
  imports: [
    CommonModule,
    CanjeoMaterialesRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
  ],
  exports:[
    CanjeoMaterialesIndexComponent
  ]
})
export class CanjeoMaterialesModule {}
