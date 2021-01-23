import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquororderhistroyPageRoutingModule } from './liquororderhistroy-routing.module';

import { LiquororderhistroyPage } from './liquororderhistroy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquororderhistroyPageRoutingModule
  ],
  declarations: [LiquororderhistroyPage]
})
export class LiquororderhistroyPageModule {}
