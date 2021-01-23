import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaultRedeemPageRoutingModule } from './vault-redeem-routing.module';

import { VaultRedeemPage } from './vault-redeem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaultRedeemPageRoutingModule
  ],
  declarations: [VaultRedeemPage]
})
export class VaultRedeemPageModule {}
