import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: '',
   redirectTo: 'login',
   pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otpverification',
    loadChildren: () => import('./otpverification/otpverification.module').then( m => m.OtpverificationPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'ordersummary',
    loadChildren: () => import('./ordersummary/ordersummary.module').then( m => m.OrdersummaryPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'mywallet',
    loadChildren: () => import('./mywallet/mywallet.module').then( m => m.MywalletPageModule)
  },
  {
    path: 'homenew',
    loadChildren: () => import('./homenew/homenew.module').then( m => m.HomenewPageModule)
  },
  {
    path: 'detectlocation',
    loadChildren: () => import('./detectlocation/detectlocation.module').then( m => m.DetectlocationPageModule)
  },
  {
    path: 'orderredeemed',
    loadChildren: () => import('./orderredeemed/orderredeemed.module').then( m => m.OrderredeemedPageModule)
  },
  {
    path: 'outlethome',
    loadChildren: () => import('./outlethome/outlethome.module').then( m => m.OutlethomePageModule)
  },
  {
    path: 'outlethomecompare',
    loadChildren: () => import('./outlethomecompare/outlethomecompare.module').then( m => m.OutlethomecomparePageModule)
  },
  {
    path: 'vaulthome',
    loadChildren: () => import('./vaulthome/vaulthome.module').then( m => m.VaulthomePageModule)
  },
  {
    path: 'orderdetailsredeemed',
    loadChildren: () => import('./orderdetailsredeemed/orderdetailsredeemed.module').then( m => m.OrderdetailsredeemedPageModule)
  },
  {
    path: 'vaultselected',
    loadChildren: () => import('./vaultselected/vaultselected.module').then( m => m.VaultselectedPageModule)
  },
  {
    path: 'vaultcart',
    loadChildren: () => import('./vaultcart/vaultcart.module').then( m => m.VaultcartPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'vaultcompare',
    loadChildren: () => import('./vaultcompare/vaultcompare.module').then( m => m.VaultcomparePageModule)
  },
  {
    path: 'vaultbalance',
    loadChildren: () => import('./vaultbalance/vaultbalance.module').then( m => m.VaultbalancePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'liquororderhistroy',
    loadChildren: () => import('./liquororderhistroy/liquororderhistroy.module').then( m => m.LiquororderhistroyPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'liquororderhistroy-details',
    loadChildren: () => import('./liquororderhistroy-details/liquororderhistroy-details.module').then( m => m.LiquororderhistroyDetailsPageModule)
  },
  {
    path: 'vault-redeem/:vaultOrderId',
    loadChildren: () => import('./vault-redeem/vault-redeem.module').then( m => m.VaultRedeemPageModule)
  },  {
    path: 'vault-order-history',
    loadChildren: () => import('./vault-order-history/vault-order-history.module').then( m => m.VaultOrderHistoryPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then( m => m.OrderSuccessPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
