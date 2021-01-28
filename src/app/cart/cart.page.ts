import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
      private helper: HelperProvider,
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
      // console.log(this.datePipe.transform(date,"dd-MM-yyyy")); //output : 2018-02-13
      this.today_date=String(this.datePipe.transform(date,"dd-MM-yyyy"));

  }
  removeItem(index,item){
    this.cart_items.splice(index, 1);
    this.final_cart_price=Number(this.final_cart_price)-(Number(item.counter)*Number(item.BigLiquorNormalPrice))

  }

    pay(){
      if(this.cart_items.length > 0){
        let uId = this.authService.getUserId();
        this.authService.liquorOrderHistory(uId,'1140',this.shopDetails.id,this.today_date,'LI123645789','wallet',this.cart_items,'0','0','0',this.final_cart_price,this.shopDetails.image,
        this.shopDetails.liquorShopName);
        this.priceIncreaseOrDecrease();
        this.navCtrl.navigateForward('/order-success');
      }else{
        this.helper.showErrorCustom('Please select any Order');
      }
    }

    public priceIncreaseByPercentage : any = (2/100);
    public priceDecreaseByPercentage : any = (0.5/100);
    priceIncreaseOrDecrease(){
      let PriceIncreasingByID = []; // Containing The Id which has Price Higher so that we can skip the Id with the Price Lower
      this.cart_items.forEach((value) => {
        // price Increasing the same Order after the Order Success
        let nowPrice = parseFloat(value.BigLiquorActualPrice) + parseFloat(this.priceIncreaseByPercentage);
        this.updatePriceValueOfLiquor(value.itemId,nowPrice);
        // Price Decreasing Other Order after Order Success
        PriceIncreasingByID.push(value.itemId);// pusing the Id Which will be Skipped
      });
      this.DeceasePriceValueforTheOrderExceptThisIds(PriceIncreasingByID);
    }

    updatePriceValueOfLiquor(value,updatePrice){
      this.userDetails.updateLiquorPriceAfterPurchase(value,updatePrice);
    }

    public newData : any = [];
    DeceasePriceValueforTheOrderExceptThisIds(ExceptIds){
      // getting the Whole Liquor Data
      this.userDetails.getLiquorDataExceptTheseIds(ExceptIds).subscribe(
        res => {
          this.newData = res;
          this.filterDataAndUpdate(ExceptIds,this.newData);
        },
        err => {console.log(err)},
      )
    }

  filterDataAndUpdate(ExceptedID,newData){
      // filtering the Ids
      newData.forEach((value) => {
        if(ExceptedID.find(x=>x == value.id) == undefined){
          // updating the Current Price
          if(parseFloat(value.BigLiquorActualPrice) >= parseFloat(value.BigLiquorMinPrice) && parseFloat(value.BigLiquorActualPrice) >= parseFloat(value.BigLiquorNormalPrice)){
            let nowPrice = parseFloat(value.BigLiquorActualPrice) - parseFloat(this.priceDecreaseByPercentage);
            if(nowPrice < parseFloat(value.BigLiquorMinPrice)){
              this.updatePriceValueOfLiquor(value.id,value.BigLiquorMinPrice);
            }
            else{
              this.updatePriceValueOfLiquor(value.id,nowPrice);
            }
          }
        }
      });
  }


  }
  