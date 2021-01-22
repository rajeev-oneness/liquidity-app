import { Component, OnInit } from '@angular/core';
import { HelperProvider } from '../services/helper.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-vaultcompare',
  templateUrl: './vaultcompare.page.html',
  styleUrls: ['./vaultcompare.page.scss'],
})
export class VaultcomparePage implements OnInit {

  public addToCart: {
    carts: CARTSITEM[];
  };
  public cartPrice : any = 0;

  constructor(private _userDetailsApi:UserDetailsService,private helper:HelperProvider
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
    // console.log(this.addToCart.carts);
  }

  public outletDetails : any = [];
  getOutletDetails(){
    this._userDetailsApi.getLiquorShops().subscribe(
      res => {
        this.outletDetails = res;
        console.log(res);
        this.helper.dismissLoader();
      },
      err => {this.helper.dismissLoader();}
    )
  }

  // public addNewCartItem(categoryItem,valueSelected) : void {
  //   this.addToCart.carts.push({
  //     itemId : categoryItem.id,
  //     liquorCategoryId : categoryItem.liquorCategoryId,
  //     itemsCount : valueSelected,
  //     BigLiquorMaxPrice: categoryItem.BigLiquorMaxPrice,
  //     BigLiquorMinPrice : categoryItem.BigLiquorMinPrice,
  //     BigLiquorNormalPrice: categoryItem.BigLiquorNormalPrice,
  //     liquorCategory: categoryItem.liquorCategory,
  //     liquorShopId: categoryItem.liquorShopId,
  //   });
  // }

  checkout_btn(){

  }

}

interface CARTSITEM {
  itemId : string;
  liquorCategoryId : string;
  itemsCount : string;
  BigLiquorMaxPrice : string;
  BigLiquorMinPrice: string;
  BigLiquorNormalPrice : string;
  liquorCategory : string;
  liquorShopId : string;
}
