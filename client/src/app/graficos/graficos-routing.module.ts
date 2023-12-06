import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosAdministradorComponent } from './graficos-administrador/graficos-administrador.component';
import { GraficosAdministradorCentroAcopioComponent } from './graficos-administrador-centro-acopio/graficos-administrador-centro-acopio.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  {
    path: 'graficos/admin',
    component: GraficosAdministradorComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR']
    }
  },
  {
    path: 'graficos/admincentro',
    component: GraficosAdministradorCentroAcopioComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR_CENTROS_ACOPIO']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficosRoutingModule { }
