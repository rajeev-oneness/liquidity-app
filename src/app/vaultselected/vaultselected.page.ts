import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaultselected',
  templateUrl: './vaultselected.page.html',
  styleUrls: ['./vaultselected.page.scss'],
})
export class VaultselectedPage implements OnInit {

  liquorMainCategory : any = []; // liquore Main Category
  liquorCategory : any = []; // liquor Category
  categoryItems : any = [];
  selectedMainCategory : any = 0;
  public userId : any = 0;
  constructor(
    private userDetails: UserDetailsService,
    private helper: HelperProvider,
    private _router: Router){
      this.addToCart = {carts: []};
      // this.viewCart = {cart : []};
      this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.getLiquorMainCategory(); // getting main Category
    this.getLiquorCategory(); // getting Liquor Category
    console.log('this is user Id' + this.userId);
  }

  getLiquorMainCategory(){
    this.userDetails.getLiquorMainCategory().subscribe(
      res => {
        this.liquorMainCategory = res;
        this.helper.dismissLoader();
      },
      err => {console.log(err),this.helper.dismissLoader();},
    )
  }

  getCategoryItem(id){
    this.userDetails.getLiquorItemsByCatgory(id).subscribe(
      res => {
        this.categoryItems = res;
        this.helper.dismissLoader();
      },
      err => {this.helper.dismissLoader();},
    )
  }

  getLiquorCategory(){
    this.userDetails.getLiquorList().subscribe(
      res => {
        this.liquorCategory = res;
        this.helper.dismissLoader();
      },
      err => {
        this.helper.dismissLoader();
      }
    );
  }

  public addToCart: {
    carts: CARTSITEM[];
  };

  // public viewCart : { cart : VIEWCART[];}

  public cartPrice = 0;
  public radioButtonSelect(categoryItem,valueSelected) {
    this.cartPrice = 0.00; // setting the Cart Price to be Zero
    this.addToCart.carts = this.addToCart.carts.filter(({ itemId }) => itemId !== categoryItem.id); // removing the Duplicasy or 0 selected from Local variable
    if(valueSelected != 0){
      // store the Data Locally
      this.addToCart.carts.push({
        itemId : categoryItem.id,
        userId : this.userId,
        liquorCategoryId : categoryItem.liquorCategoryId,
        itemsCount : valueSelected,
        BigLiquorMaxPrice: categoryItem.BigLiquorMaxPrice,
        BigLiquorMinPrice : categoryItem.BigLiquorMinPrice,
        BigLiquorNormalPrice: categoryItem.BigLiquorNormalPrice,
        BigLiquorActualPrice : categoryItem.BigLiquorActualPrice,
        liquorCategory: categoryItem.liquorCategory,
        liquorShopId: categoryItem.liquorShopId,
        liquorName : categoryItem.liquorName,
      });
    }
    // retriving the price from cuttent array
    let calculatePrice = 0;
    this.addToCart.carts.forEach(function (value) {
      calculatePrice += parseFloat(value.itemsCount) * parseFloat(value.BigLiquorActualPrice);
    });
    this.cartPrice = calculatePrice;
  }

  compareNDreview(){
    // Storing the data Locally on v8 browser
    localStorage.setItem('cartsData',JSON.stringify(this.addToCart.carts));
    localStorage.setItem('cartsPrice',JSON.stringify(this.cartPrice));
    return this._router.navigate(['/vaultcompare']);
  }

  getSelectedBefore(category){
    return 0;
  }
}

interface CARTSITEM {
  itemId : string;
  userId : string;
  liquorCategoryId : string;
  itemsCount : string;
  BigLiquorMaxPrice : string;
  BigLiquorMinPrice: string;
  BigLiquorNormalPrice : string;
  BigLiquorActualPrice : string;
  liquorCategory : string;
  liquorShopId : string;
  liquorName: string;
}

// interface VIEWCART {
//   id : string;
//   BigLiquorActualPrice : string;
//   BigLiquorMaxPrice : string;
//   BigLiquorMinPrice : string;
//   BigLiquorNormalPrice : string;
//   SmallLiquorMaxPrice : string;
//   SmallLiquorMinPrice : string;
//   SmallLiquorNormalPrice : string;
//   counter : string;
//   quantity : string;
//   image : string;
//   liquorCategory : string;
//   liquorCategoryId : string;
//   liquorName : string;
//   liquorSegment : string;
//   liquorShopId : string;
//   liquorShopOwner : string;
// }