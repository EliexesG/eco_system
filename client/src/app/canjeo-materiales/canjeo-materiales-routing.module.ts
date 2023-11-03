import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanjeoMaterialesIndexComponent } from './canjeo-materiales-index/canjeo-materiales-index.component';

const routes: Routes = [
  {
    path: 'canjeomateriales',
    component: CanjeoMaterialesIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjeoMaterialesRoutingModule {}
