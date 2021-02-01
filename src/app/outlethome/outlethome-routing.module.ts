import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutlethomePage } from './outlethome.page';

const routes: Routes = [
  {
    path: '',
    component: OutlethomePage
  },
  {
    path: 'food-item-cart',
    loadChildren: () => import('./food-item-cart/food-item-cart.module').then( m => m.FoodItemCartPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutlethomePageRoutingModule {}
