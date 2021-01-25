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
        console.log(this.orderDetails);
      },
      err => {console.log(err)},
    )
  }

  getOutletDetails(){
    this._userDetails.getLiquorShops().subscribe(
      res => {
        this.Outlets = res;
        console.log('Oulet',this.Outlets);
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
    console.log('updated Selected Outlet',this.bookingData.selectedOutlet);
  }

  confirmBooking(){
    console.log('Booking Data' ,this.bookingData);
    console.log('Item Count',this.itemCount);
    console.log('cart price',this.cartPrice);

    this._userDetails.updateVaultLiquorBalance(this.outletDetails,this.itemCount,this.cartPrice,this.bookingData).subscribe(
      res => {console.log(res)},
      err => {console.log(err)}
    )

  }

}
