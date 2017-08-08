import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from "../add-shopping/add-shopping";
import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { EditShoppingitemPage } from "../edit-shoppingitem/edit-shoppingitem";

// @IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {

shoppinglistRef$:  FirebaseListObservable<ShoppingItem[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
     private database : AngularFireDatabase ,private actionSheetCtrl : ActionSheetController) {
        this.shoppinglistRef$ = this.database.list('shopping-list');
        // this.shoppinglistRef$.subscribe(x=> console.log(x));
  }

goToAddShopping(){
  this.navCtrl.push(AddShoppingPage);
  //this.navCtrl.setRoot(AddShoppingPage); no back button because addshopping will become the rootPage
}

selectShoppingItem(shoppingItem : ShoppingItem){
  //actionSheet [edit,delete,cancel]
this.actionSheetCtrl.create({
title: `${shoppingItem.itemName}`,
buttons: [
  {
    text: 'Edit',
    handler: () =>{
      //go to edititem page

      this.navCtrl.push(EditShoppingitemPage,
        { shoppingitemID :   shoppingItem.$key });
        }
  },
{
    text: 'Delete',
    role:'destructive',
    handler: () =>{
      //delete item
      this.shoppinglistRef$.remove(shoppingItem.$key);
    }
  },
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () =>{
      console.log("cancel selected");
    }
  }

]
}).present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppinglistPage');
  }

}
