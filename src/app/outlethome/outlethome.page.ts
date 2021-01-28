import { UserDetailsService } from 'src/app/services/user-details.service';
import { HelperProvider } from 'src/app/services/helper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-outlethome',
  templateUrl: './outlethome.page.html',
  styleUrls: ['./outlethome.page.scss'],
})
export class OutlethomePage implements OnInit {
  all_liquor :any =[];
  all_liquor_category :any =[];
  all_liquor_categorywise :any =[];
  liquorshopid='';
  liquor_quantity_unit :any =[];
  cartPrice :any =[];
  cartTotal_unit0 :any =[];
  cartTotal_unit25 :any =[];
  cartTotal_unit50 :any =[];
  liquorName :any =[];
  count_CartItem=0;
  final_cart_price =0;
  final_cart_count =0;
  checkout :any =[];
  checkout_final :any =[];
  cart_items:any =[];
  items_count=0;
  cart_price =0;
  final_cart_items :any =[];
  update_cart :any =[];
  liquorCategory :any =[];
  drinks :any =[];
  scotch:any =[];
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private userDetails: UserDetailsService,
    private alertCtrl: AlertController,
    private helper: HelperProvider,
    private plt: Platform,

  ) { 
    this.drinks='liquor';
    this.scotch='premium-scotch';
    console.log(this.scotch);
    this.addToCart = {carts: []};
  }

  ngOnInit() {
    this.liquorshopid=localStorage.getItem("liquorshopid");
    console.log(">>>",this.liquorshopid);
  	this.userDetails.getLiquorData(this.liquorshopid).subscribe(
      data => {
          this.all_liquor = data;
          console.log(data)
          this.helper.dismissLoader();
      },
      err => {
          console.log(err);
          this.helper.dismissLoader();
      }
  );
  this.userDetails.getLiquorList().subscribe(
    data => {
        this.all_liquor_category = data;
        console.log(data)
        this.helper.dismissLoader();
    },
    err => {
        console.log(err);
        this.helper.dismissLoader();
    }
);

let uId = this.authService.getUserId();

this.userDetails.getCartData(uId).subscribe(
  data => {
      this.cart_items = data;
      console.log(data)
      this.helper.dismissLoader();
      console.log(">>>>>>>",this.cart_items.length)

  },
  err => {
      console.log(err);
      this.helper.dismissLoader();
  }
);

this.userDetails.getAllliquorCategory().subscribe(
  data => {
      this.liquorCategory = data;
      console.log('liquorCategory',this.liquorCategory)
      this.helper.dismissLoader();

  },
  err => {
      console.log(err);
      this.helper.dismissLoader();
  }
);

this.userDetails.fetchFoodBycategory('allFood', this.liquorshopid).subscribe(
  (data) => {
    this.helper.dismissLoader();
    // this.all_liquor_categorywise = data;  
    console.log('liquor Premium data.................',data);
  },
  (err) => {
    console.log(err);
    this.helper.dismissLoader();
  }
);

this.userDetails.fetchDataByCollectionId('liquorPrice', this.liquorshopid,"1611290839").subscribe(
  (data) => {
    this.helper.dismissLoader();
    this.all_liquor_categorywise = data;  
    console.log('liquor Premium data.................',this.all_liquor_categorywise);
  },
  (err) => {
    console.log(err);
    this.helper.dismissLoader();
  }
);
}


        liquorSegmentPremium(item){
          this.scotch=item.categoryName;
          console.log(this.scotch);
          this.userDetails.fetchDataByCollectionId('liquorPrice', this.liquorshopid,item.id).subscribe(
            (data) => {
              this.helper.dismissLoader();
              this.all_liquor_categorywise = data;  
              console.log('liquor Premium data.................',this.all_liquor_categorywise);
            },
            (err) => {
              console.log(err);
              this.helper.dismissLoader();
            }
          );
        }


        public optionsliquorShopOwner(value, index:number) { //here item is an object
          // console.log("<<<<<<<<<<",value);
      }

        checkout_btn(){
          let uId = this.authService.getUserId();
          localStorage.setItem("user_id",uId);
      this.userDetails.getCartData(uId).subscribe(
          data => {
              this.cart_items = data;
              console.log(data)
              console.log("arrLength>>",this.cart_items.length)
              this.helper.dismissLoader();
          },
          err => {
              console.log(err);
              this.helper.dismissLoader();
          }
      );
      if (this.cart_items.length==0) {
        this.authService.addCart(uId,this.checkout_final,this.final_cart_price); 
          this.checkout_final=[];
          this.navCtrl.navigateForward('/vaultcart');
      }else{
        this.userDetails.UpdateCartData('cartItem',this.cart_items[0].id,this.checkout_final,this.final_cart_price);
        this.navCtrl.navigateForward('/vaultcart');

      }   
        }

        plusss(item){      // minus functionality
          this.final_cart_value=0;
          this.addToCart.carts = this.addToCart.carts.filter(({ itemId }) => itemId !== item.id); // removing the Duplicasy or 0 selected from Local variable
          if(item.counter <= 0){}
          else{
            item.counter -= 1;
            this.addToCart.carts.push({
              counter : item.counter,
              itemId : item.id,
              BigLiquorNormalPrice:item.BigLiquorNormalPrice,
              liquorName:item.liquorName,
              BigLiquorActualPrice : item.BigLiquorActualPrice,
              BigLiquorMinPrice : item.BigLiquorMinPrice,
              total:String( parseFloat(item.counter) * parseFloat(item.BigLiquorNormalPrice)), 
            }); 
          }
          let calculatePrice = 0;
          this.addToCart.carts.forEach(function (value) {
            calculatePrice += value.counter * parseFloat(value.BigLiquorActualPrice);
          });
          this.final_cart_value = calculatePrice; 
          // console.log(">>>",this.addToCart.carts)
          let uId = this.authService.getUserId();
          }
        gotoCart(){
          localStorage.setItem("totalCartValue",this.final_cart_value);
          // Put the object into storage
          localStorage.setItem('cartItem', JSON.stringify(this.addToCart.carts));
          this.navCtrl.navigateForward('/cart');

        }
        public final_cart_value : any =0;
        minusss(item){     // plus functionality

          this.final_cart_value=0;
          this.addToCart.carts = this.addToCart.carts.filter(({ itemId }) => itemId !== item.id); // removing the Duplicasy or 0 selected from Local variable
          item.counter =parseInt(item.counter)  + 1;
          this.addToCart.carts.push({
            counter : item.counter,
            itemId : item.id,
            BigLiquorNormalPrice:item.BigLiquorNormalPrice,
            liquorName:item.liquorName,
            BigLiquorActualPrice : item.BigLiquorActualPrice,
            BigLiquorMinPrice : item.BigLiquorMinPrice,
            total:String( parseFloat(item.counter) * parseFloat(item.BigLiquorActualPrice)), 
          });
          let calculatePrice = 0;
          this.addToCart.carts.forEach(function (value) {
            calculatePrice += value.counter * parseFloat(value.BigLiquorActualPrice);
          });
          this.final_cart_value = calculatePrice; 
        }

        public addToCart: {
          carts: CARTSITEM[];
        };
        getthisCounter(item){
          let value = this.addToCart.carts.find(({ itemId }) => itemId === item.id);
          if(value == undefined){
            return 0;
          }else{
            return value.counter;
          }
        }


}

interface CARTSITEM {
  counter : number,
  itemId : string,
  BigLiquorNormalPrice:string,
  liquorName:string,
  total:string,
  BigLiquorActualPrice: string;
  BigLiquorMinPrice : string;
}