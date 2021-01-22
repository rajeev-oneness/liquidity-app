import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaultbalancePageRoutingModule } from './vaultbalance-routing.module';

import { VaultbalancePage } from './vaultbalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaultbalancePageRoutingModule
  ],
  declarations: [VaultbalancePage]
})
export class VaultbalancePageModule {}
