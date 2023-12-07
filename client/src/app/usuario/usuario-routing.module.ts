import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAllComponent } from './usuario-all/usuario-all.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { authGuard } from '../share/services/auth.guard';

const routes: Routes = [
  {
    path: 'usuario/all',
    component: UsuarioAllComponent,
    canActivate: [authGuard],
    data: {
      tipoUsuario: ['ADMINISTRADOR'],
    },
  },
  { path: 'usuario/create', component: UsuarioFormComponent },
  {
    path: 'usuario/update/:id',
    component: UsuarioFormComponent,
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
export class UsuarioRoutingModule {}
