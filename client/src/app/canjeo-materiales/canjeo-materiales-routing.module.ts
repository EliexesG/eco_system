import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanjeoMaterialesIndexComponent } from './canjeo-materiales-index/canjeo-materiales-index.component';
import { CanjeoMaterialesDetalleComponent } from './canjeo-materiales-detalle/canjeo-materiales-detalle.component';
import { CanjeoMaterialesAllComponent } from './canjeo-materiales-all/canjeo-materiales-all.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  {
    path: 'canjeomateriales',
    component: CanjeoMaterialesIndexComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['CLIENTE']
    }
  },
  {
    path: 'canjeomateriales/all',
    component: CanjeoMaterialesAllComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR_CENTROS_ACOPIO']
    }
  },
  {
    path: 'canjeomateriales/:id',
    component: CanjeoMaterialesDetalleComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR_CENTROS_ACOPIO']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjeoMaterialesRoutingModule {}
