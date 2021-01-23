import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquororderhistroyDetailsPageRoutingModule } from './liquororderhistroy-details-routing.module';

import { LiquororderhistroyDetailsPage } from './liquororderhistroy-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquororderhistroyDetailsPageRoutingModule
  ],
  declarations: [LiquororderhistroyDetailsPage]
})
export class LiquororderhistroyDetailsPageModule {}
