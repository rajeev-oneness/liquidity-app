import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaultcomparePage } from './vaultcompare.page';

const routes: Routes = [
  {
    path: '',
    component: VaultcomparePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultcomparePageRoutingModule {}
