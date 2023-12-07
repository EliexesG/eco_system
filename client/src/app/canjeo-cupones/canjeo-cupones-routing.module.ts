import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../share/services/auth.guard';
import { CanjeoCuponesIndexComponent } from './canjeo-cupones-index/canjeo-cupones-index.component';

const routes: Routes = [
  {
    path: 'canjeocupon',
    component: CanjeoCuponesIndexComponent,
    canActivate:[authGuard],
    data: {
      tipoUsuario: ['CLIENTE']
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjeoCuponesRoutingModule {}