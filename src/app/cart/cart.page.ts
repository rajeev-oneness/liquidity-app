import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart_items :any =[];
  final_cart_items :any =[];
  final_cart_price :any =[];
  shopDetails :any =[];
  today_date :any =[];
    constructor(
      private authService: AuthenticationService,
      private navCtrl: NavController,
      private userDetails: UserDetailsService,
      private alertCtrl: AlertController,
      private helper: HelperProvider,
      private plt: Platform,
      private datePipe: DatePipe
    ) { }
  
    ngOnInit() {
      // Retrieve the object from storage
      this.cart_items = JSON.parse(localStorage.getItem('cartItem'));
      console.log('retrievedObject: ', this.cart_items);
      this.shopDetails = JSON.parse(localStorage.getItem('shopDetails'));
      console.log('shopDetails: ', this.shopDetails);
      this.final_cart_price=localStorage.getItem('totalCartValue');
      var date = new Date();
      console.log(this.datePipe.transform(date,"dd-MM-yyyy")); //output : 2018-02-13
      this.today_date=String(this.datePipe.transform(date,"dd-MM-yyyy"));

  }
  removeItem(index,item){
    console.log(index);
    this.cart_items.splice(index, 1);
    this.final_cart_price=Number(this.final_cart_price)-(Number(item.counter)*Number(item.BigLiquorNormalPrice))
  }

  pay(){
    let uId = this.authService.getUserId();
    this.authService.liquorOrderHistory(uId,'1140',this.shopDetails.id,this.today_date,'LI123645789','wallet',this.cart_items,'0','0','0',this.final_cart_price,this.shopDetails.image,
    this.shopDetails.liquorShopName);
    this.navCtrl.navigateForward('/order-success');

  }

  }
  