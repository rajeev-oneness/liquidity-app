import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaultcomparePageRoutingModule } from './vaultcompare-routing.module';

import { VaultcomparePage } from './vaultcompare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaultcomparePageRoutingModule
  ],
  declarations: [VaultcomparePage]
})
export class VaultcomparePageModule {}
