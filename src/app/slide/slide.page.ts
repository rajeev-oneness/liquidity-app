import { Platform,NavController, ModalController,MenuController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef,ViewChildren,QueryList  } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController,IonRouterOutlet ,AlertController } from '@ionic/angular';
import { HelperProvider } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
// import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    // public formBuilder: FormBuilder,
    public toastController: ToastController,
    public helper: HelperProvider,
    public router: Router,
    public platform: Platform,
    public cdr: ChangeDetectorRef,
    public modalController: ModalController,
    private location: Location,
    private alertController: AlertController,
        public menuCtrl: MenuController

  ) { }

  ngOnInit() {
  }
  continue(){
    this.navCtrl.navigateRoot("/login")
  }

}
