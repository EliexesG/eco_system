import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioAllComponent } from './usuario-all/usuario-all.component';

import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioDiagComponent } from './usuario-diag/usuario-diag.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { MatDividerModule } from '@angular/material/divider'; 
import { LayoutModule } from '@angular/cdk/layout';
import { UsuarioContrasennaComponent } from './usuario-contrasenna/usuario-contrasenna.component';
import { UsuarioBilleteraComponent } from './usuario-billetera/usuario-billetera.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';

@NgModule({
  declarations: [
    UsuarioAllComponent,
    UsuarioDiagComponent,
    UsuarioFormComponent,
    UsuarioLoginComponent,
    UsuarioContrasennaComponent,
    UsuarioBilleteraComponent,
    UsuarioDetalleComponent,
  ],
  imports: [
    
    CommonModule,
    UsuarioRoutingModule,
    MatIconModule,
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
    MatTabsModule,
    MatDividerModule,
    LayoutModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
