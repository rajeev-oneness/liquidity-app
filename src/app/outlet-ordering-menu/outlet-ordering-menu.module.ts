import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletOrderingMenuPageRoutingModule } from './outlet-ordering-menu-routing.module';

import { OutletOrderingMenuPage } from './outlet-ordering-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletOrderingMenuPageRoutingModule
  ],
  declarations: [OutletOrderingMenuPage]
})
export class OutletOrderingMenuPageModule {}
