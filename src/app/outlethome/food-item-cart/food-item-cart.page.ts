import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperProvider } from 'src/app/services/helper.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-food-item-cart',
  templateUrl: './food-item-cart.page.html',
  styleUrls: ['./food-item-cart.page.scss'],
})
export class FoodItemCartPage implements OnInit {

  constructor(
    private helper : HelperProvider,
    private navCtrl: NavController,
    private userDetails:UserDetailsService
  ){
    this.addToFoodCart = {foodCart : []}; // add To Food Cart
  }

  public addToFoodCart: {foodCart: FOODITEMCART[];};
  public totalPrice = 0;
  ngOnInit() {
    this.addToFoodCart.foodCart = JSON.parse(localStorage.getItem('foodItemCart'));
    let price = 0;
    this.addToFoodCart.foodCart.forEach((value) => {
      price += parseFloat(value.price) * parseFloat(value.quantity);
    });
    this.totalPrice = price;
    // console.log(this.addToFoodCart.foodCart);
  }

  removeItem(foodCart){
      this.addToFoodCart.foodCart = this.addToFoodCart.foodCart.filter(({ foodItemId }) => foodItemId !== foodCart.foodItemId); // removing the Duplicasy or 0 selected from Local variable
      let price = 0;
      this.addToFoodCart.foodCart.forEach((value) => {
          price += parseFloat(value.price) * parseFloat(value.quantity);
      });
      this.totalPrice = price;
  }

  public bookingData = {
      mobile : '', email : '', date : '', time:'',bookingfor:'myself',
  }

  payforFood(){
    if(this.addToFoodCart.foodCart.length <= 0){
      this.helper.showErrorCustom('Please select at least one Unit');
    }else if(this.bookingData.mobile == '' || this.bookingData.email == '' || this.bookingData.date == '' || this.bookingData.time == ''){
      this.helper.showErrorCustom('Please fill your details');
    }else{
      this.saveDataTotheTable();
      this.navCtrl.navigateForward('/order-success');
    }
  }

  saveDataTotheTable(){
      let UserId = localStorage.getItem('user_id');
      // console.log('Items in Cart',this.addToFoodCart.foodCart);
      // console.log('UsrId',UserId);
      // console.log('Booking Data',this.bookingData);
      
      this.addToFoodCart.foodCart.forEach((value) => {
          this.userDetails.addFoodOrderDetails(value,this.bookingData,UserId);
      });
  }
}

interface FOODITEMCART{
  categoryId : string,
  foodItemId : string,
  price : string,
  quantity : string,
  categoryName : string,
  itemName : string,
  itemType : string,
}
