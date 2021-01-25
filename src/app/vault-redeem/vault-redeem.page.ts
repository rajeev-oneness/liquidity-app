import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HelperProvider } from '../services/helper.service';
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
    private helper : HelperProvider,
  ) { }
  public OrderId : any = '';
  public userId : any = '';
  public itemCount : any = 0;

  public orderDetails : any = {};
  public Outlets : any = [];
  ngOnInit() {
    this.OrderId = this._activatedRoute.snapshot.paramMap.get('vaultOrderId');
    this.userId = localStorage.getItem('user_id');
    this.getOrderDetailsById(this.OrderId,this.userId);
  }

  getOrderDetailsById(orderId,userId){
    this._userDetails.getVaultOrderDetailsById(parseInt(orderId),userId).subscribe(
      res => {
        this.orderDetails = res[0];
        if(this.orderDetails){
          this.getOutletDetails();
        }
      },
      err => {console.log(err)},
    )
  }

  getOutletDetails(){
    this._userDetails.getLiquorShops().subscribe(
      res => {
        this.Outlets = res;
        this.helper.dismissLoader();
      },
      err => {this.helper.dismissLoader();}
    )
  }

  plusss(){
    if(this.itemCount <= 0){this.itemCount = 0;}
    else{
      this.itemCount -= 1;
    }
    this.updateCartPrice();
  }

  minusss(){
    if(this.itemCount >= (this.orderDetails.totalUnit - parseInt(this.orderDetails.redeemed))){}
    else{
      this.itemCount += 1;
    }
    this.updateCartPrice();
  }

  public cartPrice = 0;
  updateCartPrice(){
    this.cartPrice = 0;
    this.cartPrice = this.itemCount * this.orderDetails.price;
  }

  public bookingData = {
    mobile : '', email : '', date : '', time:'',selectedOutlet : [],bookingfor:'myself',
  }

  selectedOutlet(event,outletDetails){
    if(event.target.checked){
      this.bookingData.selectedOutlet.push(outletDetails.id);
    }else{
      const index: number = this.bookingData.selectedOutlet.indexOf(outletDetails.id);
      this.bookingData.selectedOutlet.splice(index, 1);
    }
  }

  confirmBooking(){
    console.log('button Clicked');
    this._userDetails.getVaultOrderDetailsById(this.orderDetails.id,this.userId).subscribe(
      res => {
        // updating the Data
        this._userDetails.updateVaultLiquorBalance(res[0],this.itemCount,this.cartPrice,this.bookingData);
        console.log('response' ,res);
      },
      err => {}
    )
  }

}
