import { Component, OnInit } from '@angular/core';
import { HelperProvider } from '../services/helper.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-vaultbalance',
  templateUrl: './vaultbalance.page.html',
  styleUrls: ['./vaultbalance.page.scss'],
})
export class VaultbalancePage implements OnInit {

  public userId : any = 0;
  constructor(
    private _userDetails : UserDetailsService,
    private helper : HelperProvider
  ) {
    this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.getOrderDetails(this.userId);
  }

  public orderDetails : any = [];
  public getOrderDetails(userId){
    this._userDetails.getVaultOrderHistory(userId).subscribe(
      res => {
        this.orderDetails = res;
        console.log(res)
        this.helper.dismissLoader();
      },
      err => {
        console.log(err);
        this.helper.dismissLoader();
      },
    )
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
  liquorCategory : string;
  liquorShopId : string;
  liquorName: string;
}
