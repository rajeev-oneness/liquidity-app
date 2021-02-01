import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  public OrderDetails = {
    name : 'John Doe',
    phone : '+91 98076 12345',
    orderId : 'V121980761212345',
    transactione : 'wallet',
    date : '29/01/21',
    time : '02:24 PM',
    scheduledate : '29/01/21',
    scheduleTime : '02:24 PM',
    totalAmount : '890',
    tax : '45.50',
    total : '935.50',
    orderCode : '1136',
    totalReservation : '2',
  }

  gotoHome(){
    this.navCtrl.navigateRoot('/homenew');
  }
}
