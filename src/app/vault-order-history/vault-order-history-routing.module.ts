import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaultOrderHistoryPage } from './vault-order-history.page';

const routes: Routes = [
  {
    path: '',
    component: VaultOrderHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultOrderHistoryPageRoutingModule {}
