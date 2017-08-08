import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ShoppinglistPage} from '../pages/shoppinglist/shoppinglist';
import {AddShoppingPage} from '../pages/add-shopping/add-shopping';
import { EditShoppingitemPage } from "../pages/edit-shoppingitem/edit-shoppingitem";


import {AngularFireModule} from 'angularfire2';
import {FIREBASE_CREDENTIALS} from './firebase.credentials';
import {AngularFireDatabaseModule} from 'angularfire2/database';


@NgModule({
  declarations: [
    MyApp,
    ShoppinglistPage,
    AddShoppingPage,
  EditShoppingitemPage 
  ],
  imports: [
    BrowserModule,
    //initialise angularfiremodule with credentials from dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppinglistPage,
    AddShoppingPage,
    EditShoppingitemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
