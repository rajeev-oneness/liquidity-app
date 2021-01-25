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

  public addToCart: {
    carts: CARTSITEM[];
  };
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
    // console.log(this.addToCart.carts);
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

  checkout_btn(){

    this.addToCart.carts.forEach((value) => {
      this.saveOrderAPI(value);
    });
    this._router.navigate(['/order-success']);
  }

  saveOrderAPI(value){
    this._authService.addVoultOrder(value);
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
