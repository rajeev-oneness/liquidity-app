import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-liquororderhistroy',
  templateUrl: './liquororderhistroy.page.html',
  styleUrls: ['./liquororderhistroy.page.scss'],
})
export class LiquororderhistroyPage implements OnInit {
  all_liquor :any =[];
  liquorshopid='';
  all_liquor_order_histroy :any =[];
  all_liquor_order_summary :any =[];

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
      this.userDetails.getLiquorOrderHistory(uId).subscribe(
              (data) => {
                  this.all_liquor_order_histroy = data;
                  console.log(this.all_liquor_order_histroy)
                  console.log(this.all_liquor_order_histroy.length)
                  
                  this.helper.dismissLoader();
              },
              (err) => {
                  console.log(err);
              });
      }

      orderDetails(item){
        localStorage.setItem('orderDetais', JSON.stringify(item));
        var retrievedObject = localStorage.getItem('orderDetais');
        console.log('retrievedObject: ', JSON.parse(retrievedObject));
        this.navCtrl.navigateForward('/liquororderhistroy-details');

      }

}
