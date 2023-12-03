import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAllComponent } from './usuario-all/usuario-all.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

const routes: Routes = [
  { path: 'usuario/all', component: UsuarioAllComponent },
  { path: 'usuario/create', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioDetailComponent },
  { path: 'usuario/update/:id', component: UsuarioFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
