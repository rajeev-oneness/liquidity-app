import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaultbalancePage } from './vaultbalance.page';

const routes: Routes = [
  {
    path: '',
    component: VaultbalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultbalancePageRoutingModule {}
