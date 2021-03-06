import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HelperProvider } from '../services/helper.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-vaultcompare',
  templateUrl: './vaultcompare.page.html',
  styleUrls: ['./vaultcompare.page.scss'],
})
export class VaultcomparePage implements OnInit {

  public addToCart: {carts: CARTSITEM[];};
  public cartPrice : any = 0;

  constructor(private _userDetailsApi:UserDetailsService,private helper:HelperProvider,
    private _authService : AuthenticationService,private _router:Router,
  ) {
    this.addToCart = {carts: []};
  }

  ngOnInit() {
    this.getCartData(); // getting the Selected Cart
    this.getOutletDetails(); // getting the Outlet Details
  }

  getCartData(){
    this.addToCart.carts = JSON.parse(localStorage.getItem('cartsData'));
    this.cartPrice = localStorage.getItem('cartsPrice');
  }

  public outletDetails : any = [];
  getOutletDetails(){
    this._userDetailsApi.getLiquorShops().subscribe(
      res => {
        this.outletDetails = res;
        this.helper.dismissLoader();
      },
      err => {this.helper.dismissLoader();}
    )
  }

  public priceIncreaseByPercentage : any = (2/100);
  checkout_btn(){
    if(this.addToCart.carts.length > 0){
      let PriceIncreasingByID = []; // Containing The Id which has Price Higher so that we can skip the Id with the Price Lower
      this.addToCart.carts.forEach((value) => {
        // price Increasing the same Order after the Order Success
        let nowPrice = parseFloat(value.BigLiquorActualPrice) + (parseFloat(value.BigLiquorActualPrice) * parseFloat(this.priceIncreaseByPercentage));
        console.log('Actulal Price : =>'+parseFloat(value.BigLiquorActualPrice)+' => NowPrice: ',nowPrice);
        this.updatePriceValueOfLiquor(value.itemId,nowPrice);
        // Price Decreasing Other Order after Order Success
        PriceIncreasingByID.push(value.itemId);// pusing the Id Which will be Skipped
        this.saveOrderAPI(value);
      });
      this.DeceasePriceValueforTheOrderExceptThisIds(PriceIncreasingByID);
      // this._router.navigate(['/order-success']);
    }else{
      this.helper.showErrorCustom('Please select any Order');
    }
  }
  // Increasing The Liquor Price When Demanding High
  updatePriceValueOfLiquor(value,updatePrice){
    this._userDetailsApi.updateLiquorPriceAfterPurchase(value,updatePrice);
  }

  // Deceasing the Liquor Price When Not Demanding
  public newData : any = [];
  DeceasePriceValueforTheOrderExceptThisIds(ExceptIds){
    // getting the Whole Liquor Data
    console.log('Ignore Ids',ExceptIds);
    this._userDetailsApi.getLiquorDataExceptTheseIds(ExceptIds).subscribe(
      res => {
        this.newData = res;
        this.filterDataAndUpdate(ExceptIds,this.newData);
      },
      err => {console.log(err)},
    )
  }

  public priceDecreaseByPercentage : any = (0.5/100);
  filterDataAndUpdate(ExceptedID,newData){
      // filtering the Ids
      newData.forEach((value) => {
        if(ExceptedID.find(x=>x == value.id) == undefined){
          let nowPrice : any = parseFloat(value.BigLiquorActualPrice) - (parseFloat(value.BigLiquorActualPrice) * parseFloat(this.priceDecreaseByPercentage));
          if(parseFloat(nowPrice) < parseFloat(value.BigLiquorMinPrice)){
            nowPrice = parseFloat(value.BigLiquorActualPrice);
          }
          this.updatePriceValueOfLiquor(value.id,parseFloat(nowPrice));
          // console.log('Id =>'+value.id+'=>Actulal Price : =>'+parseFloat(value.BigLiquorActualPrice)+' => NowPrice: ',nowPrice+'=>Min price:=>'+value.BigLiquorMinPrice);
        }
      });
  }


  saveOrderAPI(value){
    this._authService.addVoultOrder(value);
  }

}

interface CARTSITEM {
  itemId : string;
  liquorCategoryId : string;
  itemsCount : string;
  BigLiquorActualPrice : string;
  BigLiquorMaxPrice : string;
  BigLiquorMinPrice: string;
  BigLiquorNormalPrice : string;
  liquorCategory : string;
  liquorShopId : string;
}

interface WHOLELIQUORPRICE {
  itemId : string;
  liquorCategoryId : string;
  itemsCount : string;
  BigLiquorActualPrice : string;
  BigLiquorMaxPrice : string;
  BigLiquorMinPrice : string;
  BigLiquorNormalPrice : string;
  liquorCategory : string;
  liquorShopId : string;
}
