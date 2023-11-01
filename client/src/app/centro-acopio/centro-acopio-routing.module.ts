import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroAcopioIndexComponent } from "./centro-acopio-index/centro-acopio-index.component";

const routes: Routes = [
  {
    path: 'centroacopio', component: CentroAcopioIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroAcopioRoutingModule { }
