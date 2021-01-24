import { Component, OnInit } from '@angular/core';
import { HelperProvider } from '../services/helper.service';
import { UserDetailsService } from '../services/user-details.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vault-order-history',
  templateUrl: './vault-order-history.page.html',
  styleUrls: ['./vault-order-history.page.scss'],
})
export class VaultOrderHistoryPage implements OnInit {

  public userId : any = 0;
  constructor(
    private _userDetails : UserDetailsService,
    private helper : HelperProvider,
    private _router : Router,
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

  public viewBalance(orderDetails){
    $('.view_balance').empty();
    let orderDataTemplate = '<ion-grid><ion-row class="ion-no-padding"><ion-col size="4"><div class="unit"><p>Total Units <span>'+orderDetails.totalUnit+'</span></p></div></ion-col><ion-col size="4"><div class="unit"><p>Units Redeemed <span>'+orderDetails.redeemed+'</span></p></div></ion-col><ion-col size="4"><div class="unit"><p>Remaining Units <span>'+(parseInt(orderDetails.totalUnit) - parseInt(orderDetails.redeemed))+'</span></p></div></ion-col></ion-row></ion-grid>';
    orderDataTemplate += '<ion-row><ion-col size="4"><p class="content ion-text-left">OUTLET</p></ion-col><ion-col size="4"><p class="content ion-text-center">DATE</p></ion-col><ion-col size="4"><p class="content ion-text-right">UNITS</p></ion-col></ion-row><ion-row><ion-col size="4"><p class="content black ion-text-left">Orko’ss Restaurant</p></ion-col><ion-col size="4"><p class="content black ion-text-center">29/01/2018</p></ion-col><ion-col size="4"><p class="content black ion-text-right">3</p></ion-col></ion-row><ion-row><ion-col size="4"><p class="content black ion-text-left">Orko’ss Restaurant</p></ion-col><ion-col size="4"><p class="content black ion-text-center">29/01/2018</p></ion-col><ion-col size="4"><p class="content black ion-text-right">3</p></ion-col></ion-row>';
    $('#divCount'+orderDetails.id).empty()
      .append(orderDataTemplate);
  }

  public redeem(orderDetails){
    this._router.navigate(['/vault-redeem/'+orderDetails.id]);
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
