import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodItemCartPageRoutingModule } from './food-item-cart-routing.module';

import { FoodItemCartPage } from './food-item-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodItemCartPageRoutingModule
  ],
  declarations: [FoodItemCartPage]
})
export class FoodItemCartPageModule {}
