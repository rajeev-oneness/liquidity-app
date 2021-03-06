import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { combineAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(
  	private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthenticationService
  	) { }


  uploadProfileImages(image, myId) {
        const date = new Date();
        return new Promise((resolve, reject) => {
            if (image) {
                const file = image;
                const filePath = `profile_img/img-${myId}`;
                const ref = this.storage.ref(filePath);

                const task = ref
                    .putString(file, 'data_url')
                    .then(() => {
                        ref.getDownloadURL().subscribe(
                            url => {
                                console.log('url : ', url);
                                resolve({ status: true, url });
                            },
                            err => {
                                console.log(err);
                                reject({ status: false, err });
                            }
                        );
                    })
                    .catch(err => {
                        reject({ status: false, err });
                    });
            }
        });
    }

    addUserData(collection, userId, user_name, user_age, user_city, user_country, dream_job, about_me) {
        return this.afs
            .collection(`/${collection}`)
            .doc(userId)
            .update({
                name: user_name,
                age:user_age,
                user_city:user_city,
                user_country:user_country,
                dream_job:dream_job,
                about_me:about_me
            });
    }



    getLiquorShops() {
        return this.afs.collection('/liquorshops').valueChanges();
    }

    getOrderList() {
        return this.afs.collection('/orderHistory').valueChanges();
    }

    getLiquorList() {
        return this.afs.collection('/liquorName').valueChanges();
    }
    getLiquorListWithPrice() {
        return this.afs.collection('/liquorPrice').valueChanges();
    }
    fetchShop(collection, shop_id) {
        return this.afs
            .collection(`/${collection}`, ref =>
                ref.where('id', '==', shop_id)
            )
            .valueChanges();
    }

    // getUserbyId(user_id) {
    //     return this.afs.collection('/userProfile'), ref =>
    //     ref.where('id', '==', user_id)
    // .valueChanges();
    // }

    promptsAnswer(collection, userId, promptArr) {
        return this.afs
            .collection(`/${collection}`)
            .doc(userId)
            .update({
                prompts: promptArr
            });
    }

    getUserbyId(collection, user_id) {
        console.log("user_id?????",user_id)
        return this.afs
            .collection(`/${collection}`, ref =>
                ref.where('id', '==', user_id)
            )
            .valueChanges();
    }

    getVisions() {
        return this.afs.collection('/visions').valueChanges();
    }

    uploadVisionImages(image, myId,visionId) {
        const date = new Date();
        return new Promise((resolve, reject) => {
            if (image) {
                const file = image;
                const filePath = `vision_img/img-${myId}-${visionId}`;
                const ref = this.storage.ref(filePath);

                const task = ref
                    .putString(file, 'data_url')
                    .then(() => {
                        ref.getDownloadURL().subscribe(
                            url => {
                                console.log('url : ', url);
                                resolve({ status: true, url });
                            },
                            err => {
                                console.log(err);
                                reject({ status: false, err });
                            }
                        );
                    })
                    .catch(err => {
                        reject({ status: false, err });
                    });
            }
        });
    }

    visionsAnswer(collection, userId, visionArr) {
        return this.afs
            .collection(`/${collection}`)
            .doc(userId)
            .update({
                visions: visionArr
            });
    }

    getPrograms() {
        return this.afs.collection('/programs').valueChanges();
    }
    getYourself_date() {
        return this.afs.collection('/dates').valueChanges();
    }
    UpdateUserData(collection, itemid,name,mail,mobile,dob,gender,address) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                 id: itemid,
                 name: name,
                 mail: mail,
                 mobile: mobile,
                 dob:dob,
                gender:gender,
                address:address,


            });
    }
    deleteUserData(pid) {
        return this.afs
            .collection('/userProfile')
            .doc(pid.toString())
            .delete();
    }

    UpdateLiquorShopData(collection, itemid,liquorShopOwner,liquorShopName,liquorLocation,liquorName,liquorSize,liquorPrice,liquorLocationLatitude,liquorLocationLongitude,liquorShopOwnerEmail,phone,website,fb_link,twitter_link,youtube_link) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                liquorShopOwner:liquorShopOwner,
                 liquorLocation: liquorLocation,
                 liquorShopName: liquorShopName,
                 liquorName:liquorName,
                 liquorSize: liquorSize,
                 liquorPrice:liquorPrice,
                 liquorLocationLatitude:liquorLocationLatitude,
                liquorLocationLongitude:liquorLocationLongitude,
                liquorShopOwnerEmail:liquorShopOwnerEmail,
                phone:phone,
                website:website,
                fb_link:fb_link,
                twitter_link:twitter_link,
                youtube_link:youtube_link,

            });
    }
    deleteLiquorShop(pid) {
        return this.afs
            .collection('/liquorshops')
            .doc(pid.toString())
            .delete();
    }


    UpdateLiquorWithPrice(collection, liquorShopOwner,liquorLocation,id,liquorName,liquorCategory,SmallLiquorMinPrice,SmallLiquorMaxPrice,SmallLiquorNormalPrice,BigLiquorMinPrice,BigLiquorMaxPrice,BigLiquorNormalPrice,liquorShopId) {
        return this.afs
            .collection(`/${collection}`)
            .doc(id.toString())
            .update({
                liquorShopId:liquorShopId,
                liquorShopOwner:liquorShopOwner,
               liquorName:liquorCategory,
                liquorCategory:liquorName,
                SmallLiquorMinPrice:SmallLiquorMinPrice,
                SmallLiquorMaxPrice:SmallLiquorMaxPrice,
                SmallLiquorNormalPrice:SmallLiquorNormalPrice,
                BigLiquorMinPrice:BigLiquorMinPrice,
                BigLiquorMaxPrice:BigLiquorMaxPrice,
                BigLiquorNormalPrice:BigLiquorNormalPrice,

            });
    }
    deleteLiquorWithPrice(pid) {
        return this.afs
            .collection('/liquorPrice')
            .doc(pid.toString())
            .delete();
    }

    UpdateOrderData(collection, itemid,name,mail,price,order_date,orderid,shop_name) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                id: itemid,
                 name: name,
                 mail: mail,
                 price: price,
                 order_date:order_date,
                 orderid:orderid,
                 shop_name:shop_name,

            });
    }
    deleteOrder(pid) {
        return this.afs
            .collection('/orderHistory')
            .doc(pid.toString())
            .delete();
    }

    deleteEnquiryList(pid) {
        return this.afs
            .collection('/enquiryList')
            .doc(pid.toString())
            .delete();
    }

    UpdateLiquor(collection, itemid,liquorName) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                 liquorName:liquorName
            });
    }

    deleteLiquor(pid) {
        return this.afs.collection('/liquorName').doc(pid.toString()).delete();
    }

    UpdateVisions(collection, itemid,visions) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                 vision: visions,
            });
    }

    deleteVisions(pid) {
        return this.afs.collection('/visions').doc(pid.toString()).delete();
    }

    getAllliquorshops() {
        return this.afs.collection('/liquorshops').valueChanges();
    }

    getAllliquorCategory() {
        return this.afs.collection('/liquorCategory').valueChanges();
    }

    getLiquorData(id) {
        return this.afs.collection('/liquorPrice', ref => ref.where('liquorShopId', '==', id)).valueChanges();
    }

    getLiquorShopById(id) {
        return this.afs
            .collection('/liquorshops', ref => ref.where('id', '==', id)).valueChanges();
    }
    fetchDataByCollectionId(collection, shopid,categoryid) {
        return this.afs
            .collection(`/${collection}`, ref =>
                ref.where('liquorShopId', '==', shopid).where('liquorCategoryId', '==', categoryid)
            ).valueChanges();
    }

    fetchFoodBycategory(collection, shopid) {
        return this.afs
            .collection(`/${collection}`, ref =>
                ref.where('liquorShopId', '==', shopid)
            ).valueChanges();
    }

    getCartData(id) {
        return this.afs.collection('/cartItem', ref => ref.where('user_id', '==', id)).valueChanges();
    }
    UpdateCartData(collection, itemid,final_cart,total_value) {
        return this.afs
            .collection(`/${collection}`)
            .doc(itemid.toString())
            .update({
                cart_items:final_cart,
                totalCost:total_value
            });
    }

    getLiquorMainCategory(){
        return this.afs.collection('/liquorCategory').valueChanges();
    }

    getLiquorItemsByCatgory(categoryMainId){
        return this.afs.collection('/liquorPrice', ref => ref.where('liquorCategoryId', '==', categoryMainId)
        ).valueChanges();
    }

    getLiquorOrderHistory(user_id){
        return this.afs.collection('/liquorOrderHistory', ref => ref.where('user_id', '==', user_id)
        ).valueChanges();
    }

    deleteSelectedItemforUserFromCart(){
        return this.afs.collection('/cartItem').valueChanges();
    }

    addSelectedItemToCart(itemObject,quantity,userId) {
        let id =new Date().getTime();
        this.afs.doc(`/cartItem/${id}`).set({
            id : id,
            itemId : itemObject.itemId,
            userId : userId,
            liquorCategoryId : itemObject.liquorCategoryId,
            itemsCount : quantity,
            BigLiquorMaxPrice : itemObject.BigLiquorMaxPrice,
            BigLiquorMinPrice : itemObject.BigLiquorMinPrice,
            BigLiquorNormalPrice : itemObject.BigLiquorNormalPrice,
            liquorCategory : itemObject.liquorCategory,
            liquorShopId : itemObject.liquorShopId,
            liquorName : itemObject.liquorName,
        }, { merge: true });
    }

    getVaultOrderHistory(userId){
        return this.afs.collection('/voultOrderHistory', ref => ref.where('userId', '==', userId)
        ).valueChanges();
    }

    getVaultOrderDetailsById(orderId,userId){
        return this.afs.collection('/voultOrderHistory', ref => ref.where('id', '==', orderId).where('userId','==',userId)
        ).valueChanges();
    }

    updateVaultLiquorBalance(orderDetails,totalRedeemed,cartPrice,bookingData){
        return this.afs.collection('/voultOrderHistory').doc(orderDetails.id.toString()).update({
            redeemed : totalRedeemed,
        });
    }

    updateLiquorPriceAfterPurchase(itemId,newPrice){
        // the Details is the Parameter which is hold all the Information of Liquor price and The New price is Holding the new Price increase or Decrease
        // here the BigLiquorActualPrice is the base column or for Price Calculation
        return this.afs.collection('/liquorPrice').doc(itemId.toString()).update({
            BigLiquorActualPrice : newPrice,
        });
    }

    getLiquorDataExceptTheseIds(Ids) {
        return this.afs.collection('/liquorPrice').valueChanges();
    }

    getFoodCategory(shopId){
        return this.afs.collection('/foodCategory', ref => ref.where('shopId', '==', shopId)).valueChanges();
    }

    getFoodItemByCategory(categoryId){
        return this.afs.collection('/foodItem', ref => ref.where('foodCategoryId', '==', categoryId.toString())
        ).valueChanges();
    }

    addFoodOrderDetails(orderData,userData,logeedInUserId){
        let id = new Date().getTime();
        this.afs.doc(`/foodOrder/${id}`).set({
            id : id,
            userId : logeedInUserId,
            foodCategoryId : orderData.categoryId,
            foodCategoryName : orderData.categoryName,
            foodItemId : orderData.foodItemId,
            foodItemName : orderData.itemName,
            foodItemType : orderData.itemType,
            price : orderData.price,
            shopId : orderData.shopId,
            quantity : orderData.quantity,
            bookingFor : userData.bookingfor,
            date : userData.date,
            time : userData.time,
            email : userData.email,
            mobile : userData.mobile,
            created_at : '',
        }, { merge: true });
        return id;
    }

}
