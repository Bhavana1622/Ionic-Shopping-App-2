import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

shoppingItem = {} as ShoppingItem;

//ref to database ; $=observable
shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database : AngularFireDatabase) {
      this.shoppingItemRef$ = this.database.list('shopping-list');

      /*
      shopping-list
      0:
      itemName:
      itemNumber:
      1:
      --...
      */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingPage');
  }

  addShoppingItem(shoppingItem : ShoppingItem){
    // this.shoppingItemRef$.push(this.shoppingitem); without converting to number
    //convert to number
    this.shoppingItemRef$.push({
itemName : this.shoppingItem.itemName,
itemNumber : Number(this.shoppingItem.itemNumber)
    });
console.log(shoppingItem);
this.shoppingItem = {} as ShoppingItem;
this.navCtrl.pop(); //takes you back 1 step so previous page

  }

}
