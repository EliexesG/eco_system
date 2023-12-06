import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { MaterialAllComponent } from './material-all/material-all.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  { path: 'material', component: MaterialIndexComponent },
  {
    path: 'material/all',
    component: MaterialAllComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'material/create',
    component: MaterialFormComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'material/:id',
    component: MaterialDetalleComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  {
    path: 'material/update/:id',
    component: MaterialFormComponent,
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
export class MaterialRoutingModule {}
