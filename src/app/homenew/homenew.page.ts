import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-homenew',
  templateUrl: './homenew.page.html',
  styleUrls: ['./homenew.page.scss'],
})
export class HomenewPage implements OnInit {
all_liquor :any =[];
all_liquor_categorywise :any =[];
liquorshopid='';
all_liquor_shop :any =[];

  constructor(
        private authService: AuthenticationService,
        private navCtrl: NavController,
        private userDetails: UserDetailsService,
        private alertCtrl: AlertController,
        private helper: HelperProvider,
        private plt: Platform,

  ) { }

  ngOnInit() {
  let uId = this.authService.getUserId();
  localStorage.setItem("user_id",uId);
  this.userDetails.getAllliquorshops().subscribe(
          (data) => {
              this.all_liquor_shop = data;
              console.log(this.all_liquor_shop)
              this.helper.dismissLoader();
          },
          (err) => {
              console.log(err);
          });
  }
  gotoshopproduct(liquorshopid){
    this.navCtrl.navigateForward('/outlethome');
    localStorage.setItem("liquorshopid",liquorshopid);
  }
  gotoliqudityVault(){
    // this.navCtrl.navigateForward('/vaulthome');
    var orderSUmmary:any =[];
    orderSUmmary.push(
      {
      liquorName:'Vodka',
      liqourPrice:"765",
      liqourCount:'4'
    },
    {
      liquorName:'Rum',
      liqourPrice:"330",
      liqourCount:'6'
    },
    )
    this.authService.liquorOrderHistory('1140','1611040596543','23/01/2020','LI123645789','wallet',orderSUmmary,'4500','200','500','3800');
        this.navCtrl.navigateForward('/ordersummary');


  }
}
