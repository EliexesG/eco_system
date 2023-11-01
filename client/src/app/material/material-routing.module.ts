import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';

const routes: Routes = [
  { path: 'material', component: MaterialIndexComponent },
  { path: 'material/:id', component: MaterialDetalleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
