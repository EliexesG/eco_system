import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponIndexComponent } from './cupon-index/cupon-index.component';
import { CuponFormComponent } from './cupon-form/cupon-form.component';
import { CuponAllComponent } from './cupon-all/cupon-all.component';
import { CuponDetalleComponent } from './cupon-detalle/cupon-detalle.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  {
    path: 'cupon',
    component: CuponIndexComponent,
  },
  {
    path: 'cupon/all',
    component: CuponAllComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR']
    }
  },
  {
    path: 'cupon/create',
    component: CuponFormComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR']
    }
  },
  {
    path: 'cupon/:id',
    component: CuponDetalleComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR']
    }
  },
  {
    path: 'cupon/update/:id',
    component: CuponFormComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponRoutingModule {}
