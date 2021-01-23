import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquororderhistroyDetailsPage } from './liquororderhistroy-details.page';

const routes: Routes = [
  {
    path: '',
    component: LiquororderhistroyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquororderhistroyDetailsPageRoutingModule {}
