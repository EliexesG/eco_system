import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanjeoMaterialesIndexComponent } from './canjeo-materiales-index/canjeo-materiales-index.component';
import { CanjeoMaterialesDetalleComponent } from './canjeo-materiales-detalle/canjeo-materiales-detalle.component';
import { CanjeoMaterialesAllComponent } from './canjeo-materiales-all/canjeo-materiales-all.component';

const routes: Routes = [
  {
    path: 'canjeomateriales',
    component: CanjeoMaterialesIndexComponent,
  },
  {
    path: 'canjeomateriales/all',
    component: CanjeoMaterialesAllComponent,
  },
  {
    path: 'canjeomateriales/:id',
    component: CanjeoMaterialesDetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjeoMaterialesRoutingModule {}
