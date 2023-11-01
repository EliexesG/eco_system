import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponIndexComponent } from './cupon-index/cupon-index.component';

const routes: Routes = [
  {
    path: 'cupon', component: CuponIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponRoutingModule { }
