import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroAcopioIndexComponent } from "./centro-acopio-index/centro-acopio-index.component";
import { CentroAcopioAllComponent } from './centro-acopio-all/centro-acopio-all.component';
import { CentroAcopioFormComponent } from './centro-acopio-form/centro-acopio-form.component';
import { CentroAcopioDetalleComponent } from './centro-acopio-detalle/centro-acopio-detalle.component';

const routes: Routes = [
  {
    path: 'centroacopio', component: CentroAcopioIndexComponent
  },
  {
    path: 'centroacopio/all', component: CentroAcopioAllComponent
  },
  {
    path:'centroacopio/create', component: CentroAcopioFormComponent
  },  
  {
    path:'centroacopio/update/:id', component: CentroAcopioFormComponent
  },
  {
    path: 'centroacopio/:id', component: CentroAcopioDetalleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroAcopioRoutingModule { }
