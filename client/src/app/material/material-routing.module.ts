import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { MaterialAllComponent } from './material-all/material-all.component';
import { MaterialFormComponent } from './material-form/material-form.component';

const routes: Routes = [
  { path: 'material', component: MaterialIndexComponent },
  { path: 'material/all', component: MaterialAllComponent },
  { path: 'material/create', component: MaterialFormComponent },
  { path: 'material/:id', component: MaterialDetalleComponent },
  { path: 'material/update/:id', component: MaterialFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
