import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquororderhistroyPage } from './liquororderhistroy.page';

const routes: Routes = [
  {
    path: '',
    component: LiquororderhistroyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquororderhistroyPageRoutingModule {}
