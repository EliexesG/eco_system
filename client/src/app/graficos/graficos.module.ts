import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosRoutingModule } from './graficos-routing.module';
import { GraficosAdministradorComponent } from './graficos-administrador/graficos-administrador.component';
import { GraficosAdministradorCentroAcopioComponent } from './graficos-administrador-centro-acopio/graficos-administrador-centro-acopio.component';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    GraficosAdministradorComponent,
    GraficosAdministradorCentroAcopioComponent,
  ],
  imports: [
    CommonModule,
    GraficosRoutingModule,
    NgChartsModule,
    MatCardModule,
  ]
})
export class GraficosModule { }
