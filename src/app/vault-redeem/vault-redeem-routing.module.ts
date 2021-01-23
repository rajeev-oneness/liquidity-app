import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaultRedeemPage } from './vault-redeem.page';

const routes: Routes = [
  {
    path: '',
    component: VaultRedeemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultRedeemPageRoutingModule {}
