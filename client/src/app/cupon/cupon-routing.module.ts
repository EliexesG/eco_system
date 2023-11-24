import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponIndexComponent } from './cupon-index/cupon-index.component';
import { CuponFormComponent } from './cupon-form/cupon-form.component';
import { CuponAllComponent } from './cupon-all/cupon-all.component';
import { CuponDetalleComponent } from './cupon-detalle/cupon-detalle.component';

const routes: Routes = [
  {
    path: 'cupon',
    component: CuponIndexComponent,
  },
  {
    path: 'cupon/all',
    component: CuponAllComponent,
  },
  {
    path: 'cupon/create',
    component: CuponFormComponent,
  },
  {
    path: 'cupon/:id',
    component: CuponDetalleComponent,
  },
  {
    path: 'cupon/update/:id',
    component: CuponFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponRoutingModule {}
