import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanjeoCuponesRoutingModule } from './canjeo-cupones-routing.module';
import { CanjeoCuponesIndexComponent } from './canjeo-cupones-index/canjeo-cupones-index.component';
import { CanjeoCuponesDiagComponent } from './canjeo-cupones-diag/canjeo-cupones-diag.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    CanjeoCuponesIndexComponent,
    CanjeoCuponesDiagComponent
  ],
  imports: [
    CommonModule,
    CanjeoCuponesRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    QRCodeModule,
    MatSortModule,
  ]
})
export class CanjeoCuponesModule { }
