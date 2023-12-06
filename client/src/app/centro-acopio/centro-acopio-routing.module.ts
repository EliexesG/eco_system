import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroAcopioIndexComponent } from './centro-acopio-index/centro-acopio-index.component';
import { CentroAcopioAllComponent } from './centro-acopio-all/centro-acopio-all.component';
import { CentroAcopioFormComponent } from './centro-acopio-form/centro-acopio-form.component';
import { CentroAcopioDetalleComponent } from './centro-acopio-detalle/centro-acopio-detalle.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  {
    path: 'centroacopio',
    component: CentroAcopioIndexComponent,
  },
  {
    path: 'centroacopio/all',
    component: CentroAcopioAllComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'centroacopio/create',
    component: CentroAcopioFormComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'centroacopio/update/:id',
    component: CentroAcopioFormComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'centroacopio/:id',
    component: CentroAcopioDetalleComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentroAcopioRoutingModule {}
