import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HelperProvider } from './services/helper.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertController, NavController, IonRouterOutlet } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  user_name :any =[];
  user_mail :any =[];
  user_mobile :any =[];
  user :any =[];

  public appPages = [
    {
      title: 'Home',
      url: '/homenew',
      icon: 'mail'
    },
    {
      title: 'Liquidity Vault',
      url: '/vaulthome',
      icon: 'paper-plane'
    },
    {
      title: 'My Profile',
      url: '/myprofile',
      icon: 'heart'
    },
    {
      title: 'Order History',
      url: '/liquororderhistroy',
      icon: 'archive'
    },
    {
      title: 'My Wallet',
      url: '/homenew',
      icon: 'trash'
    },
    {
      title: 'Notification',
      url: '/homenew',
      icon: 'warning'
    },
    {
      title: 'Events',
      url: '//homenew',
      icon: 'archive'
    },
    {
      title: 'Help',
      url: '/homenew',
      icon: 'trash'
    },
    {
      title: 'Privacy Policy',
      url: '/homenew',
      icon: 'warning'
    },
    {
      title: 'Terms of Use',
      url: '/homenew',
      icon: 'warning'
    },
    {
      title: 'General Terms & Conditions',
      url: '/homenew',
      icon: 'archive'
    },
    {
      title: 'Faq',
      url: '/homenew',
      icon: 'trash'
    },
    {
      title: 'Logout',
      url: '',
      icon: 'warning'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private auth: AuthenticationService,
        public router: Router,
        private helper: HelperProvider,
  ) {
    // this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const userAuthSubs = this.auth.currentAuthState.subscribe(auth => {
        console.log('App Component authState : ', auth);
        userAuthSubs.unsubscribe();
        console.log('isAuthenticated : ', this.auth.isAuthenticated());
        if (this.auth.isAuthenticated()) {
            this.helper.dismissLoader();
            this.auth.getUserById(this.auth.getUserId()).pipe(take(1)).subscribe(
                (user: any) => {
                    this.user=user;
                    this.user_mail=this.user.mail;
                    this.user_name=this.user.name;
                    this.user_mobile=this.user.mobile;
                    localStorage.setItem('user_Detais', JSON.stringify(this.user));
                    this.helper.dismissLoader();
                    this.navCtrl.navigateRoot('/homenew');
                },
                err => {
                    this.helper.dismissLoader();
                    console.log(err);
                }
            );
        } else {
          console.log("dismissLoader")
            this.helper.dismissLoader();
            this.router.navigate(['/slide']);
        }
    });
});
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
