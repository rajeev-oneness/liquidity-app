import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-outlet-ordering-menu',
  templateUrl: './outlet-ordering-menu.page.html',
  styleUrls: ['./outlet-ordering-menu.page.scss'],
})
export class OutletOrderingMenuPage implements OnInit {
  shopDetails :any =[];
  constructor(
    private authService: AuthenticationService,
        private navCtrl: NavController,
        private userDetails: UserDetailsService,
        private alertCtrl: AlertController,
        private helper: HelperProvider,
        private plt: Platform,

  ) { }

  ngOnInit() {
    this.shopDetails = JSON.parse(localStorage.getItem('shopDetails'));
      console.log('shopDetails: ', this.shopDetails);
  }
  gotoOutLet(){
     this.navCtrl.navigateForward('/outlethome');
    //  this.navCtrl.navigateForward('/outlet-ordering-menu');

    //  localStorage.setItem("liquorshopid",liquorshopid);
    //  localStorage.setItem('shopDetails', JSON.stringify(item));
  }

}
