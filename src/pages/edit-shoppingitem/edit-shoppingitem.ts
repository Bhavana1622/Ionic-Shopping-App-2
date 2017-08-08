import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase,FirebaseObjectObservable} from 'angularfire2/database';
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";



//to unsubscribe
import {Subscription} from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-edit-shoppingitem',
  templateUrl: 'edit-shoppingitem.html',
})
export class EditShoppingitemPage {


  shoppingItemSubscription : Subscription;
  shoppingObjRef$ : FirebaseObjectObservable<ShoppingItem>;
 shoppingItem = {} as ShoppingItem;



  constructor(public navCtrl: NavController, public navParams: NavParams,
      private database : AngularFireDatabase) {

        //gets the selected item id
        const shoppingItemId =this.navParams.get('shoppingitemID');
        console.log(shoppingItemId);

        //attaches that id to FireBase database
         this.shoppingObjRef$ = this.database.object(`shopping-list/${shoppingItemId}`);
        //subscribes the item and unwraps it to the object 
        //hence object is inside shoppingitem
        this.shoppingItemSubscription =
         this.shoppingObjRef$.subscribe(shopping => this.shoppingItem = shopping);
  }

editshoppingItem(shoppingItem : ShoppingItem){
  this.shoppingObjRef$.update(shoppingItem);
  this.navCtrl.pop();
}
ionViewWillLeave(){
  //free resources when leave the page
  this.shoppingItemSubscription.unsubscribe();
}

}
