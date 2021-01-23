import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-vault-redeem',
  templateUrl: './vault-redeem.page.html',
  styleUrls: ['./vault-redeem.page.scss'],
})
export class VaultRedeemPage implements OnInit {

  constructor(
    private _userDetails:UserDetailsService,
    private _authService:AuthenticationService,
    private _router :  Router,
    private _activatedRoute:ActivatedRoute,
  ) { }
  public OrderId : any = '';
  public userId : any = '';
  public itemCount : any = 0;
  ngOnInit() {
    this.OrderId = this._activatedRoute.snapshot.paramMap.get('vaultOrderId');
    this.userId = localStorage.getItem('user_id');
    this.getOrderDetailsById(this.OrderId,this.userId);
  }

  getOrderDetailsById(orderId,userId){
    this._userDetails.getVaultOrderDetailsById(parseInt(orderId),userId).subscribe(
      res => {console.log(res)},
      err => {console.log(err)},
    )
  }

  plusss(){
    this.itemCount += 1;
  }

  minusss(){
    this.itemCount -= 1;
  }

}
