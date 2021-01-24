import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaultOrderHistoryPageRoutingModule } from './vault-order-history-routing.module';

import { VaultOrderHistoryPage } from './vault-order-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaultOrderHistoryPageRoutingModule
  ],
  declarations: [VaultOrderHistoryPage]
})
export class VaultOrderHistoryPageModule {}
