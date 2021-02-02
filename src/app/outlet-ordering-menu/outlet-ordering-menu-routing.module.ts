import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletOrderingMenuPage } from './outlet-ordering-menu.page';

const routes: Routes = [
  {
    path: '',
    component: OutletOrderingMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletOrderingMenuPageRoutingModule {}
