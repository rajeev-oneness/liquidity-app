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
  user_data :any =[];

  constructor(
        private authService: AuthenticationService,
        private navCtrl: NavController,
        private userDetails: UserDetailsService,
        private alertCtrl: AlertController,
        private helper: HelperProvider,
        private plt: Platform,
  ) { }

  ngOnInit() {
  // let uId = this.authService.getUserId();
    let uId = localStorage.getItem('user_id');
    this.authService.addUser(uId,localStorage.getItem("name"), localStorage.getItem("email"),localStorage.getItem("mobile"),"","","","https://firebasestorage.googleapis.com/v0/b/liquidity-app-6d8cb.appspot.com/o/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png?alt=media&token=8f9cd01c-96ba-433b-b99f-67f5c1e13991"); 

        // localStorage.setItem("user_id",uId);
        this.userDetails.getAllliquorshops().subscribe(
          res => {
              this.all_liquor_shop = res;
              this.helper.dismissLoader();
          },
          err => {}
        );
        this.userDetails.getUserbyId("userProfile",uId).subscribe(
            data => {
                this.user_data = data;
                localStorage.setItem("user_name",this.user_data.name);
                localStorage.setItem("user_email",this.user_data.mail);
                localStorage.setItem("user_mobile",this.user_data.mobile);
                this.helper.dismissLoader();
                // localStorage
            },
            err => {}
        );
  }

    gotoshopproduct(liquorshopid,item){
      this.navCtrl.navigateForward('/outlethome');
      localStorage.setItem("liquorshopid",liquorshopid);
      localStorage.setItem('shopDetails', JSON.stringify(item));
    }

    gotoliqudityVault(){
      let uId = this.authService.getUserId();
      this.navCtrl.navigateForward('/vaulthome');
      // var orderSUmmary:any =[];
      // orderSUmmary.push(
      //   {
      //   liquorName:'Vodka',
      //   liqourPrice:"765",
      //   liqourCount:'4',
      //   liquorImage:"https://firebasestorage.googleapis.com/v0/b/liquidity-app-6d8cb.appspot.com/o/icon_01.png?alt=media&token=dab65c4d-fb8e-4766-9163-bd7485b0eaab"
      // },
      // {
      //   liquorName:'Rum',
      //   liqourPrice:"330",
      //   liqourCount:'6',
      //   liquorImage:"https://firebasestorage.googleapis.com/v0/b/liquidity-app-6d8cb.appspot.com/o/icon_01.png?alt=media&token=dab65c4d-fb8e-4766-9163-bd7485b0eaab"

      // },
      // )
      // // this.authService.liquorOrderHistory(uId,'1140','1611040596543','23/01/2020','LI123645789','wallet',orderSUmmary,'4500','200','500','3800',"https://firebasestorage.googleapis.com/v0/b/liquidity-app-6d8cb.appspot.com/o/Home%20page%20icon_05.png?alt=media&token=ada76441-9bfa-4bc1-893c-160a3bb8a043",
      // // "Fl Shop");
      //     this.navCtrl.navigateForward('/liquororderhistroy');
    }
}
