import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-liquororderhistroy-details',
  templateUrl: './liquororderhistroy-details.page.html',
  styleUrls: ['./liquororderhistroy-details.page.scss'],
})
export class LiquororderhistroyDetailsPage implements OnInit {
  all_liquor_order_summary :any =[];
  all_order :any =[];
    constructor(
          private authService: AuthenticationService,
          private navCtrl: NavController,
          private userDetails: UserDetailsService,
          private alertCtrl: AlertController,
          private helper: HelperProvider,
          private plt: Platform,
  
    ) { }
    ngOnInit() {
      var retrievedObject = localStorage.getItem('orderDetais');
      this.all_order=JSON.parse(retrievedObject);
      this.all_liquor_order_summary=JSON.parse(retrievedObject).orderSummary;
        console.log('retrievedObject: ', JSON.parse(retrievedObject).orderSummary);
        console.log(this.all_liquor_order_summary)
      }

     

}
