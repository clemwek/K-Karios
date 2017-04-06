import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { FirebaseService } from './services/firebase.service';
import { DateTimeService } from './services/date-time.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StaffComponent } from './components/staff/staff.component';
import { SellStockComponent } from './components/sell-stock/sell-stock.component';
import { ServingComponent } from './components/serving/serving.component';
import { CompleteComponent } from './components/complete/complete.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditStockInComponent } from './components/edit-stock-in/edit-stock-in.component';

export const firebaseConfig = {
    apiKey: "AIzaSyCo98tJwrDrL6Zu1QIWf0NBb-klowGVnMs",
    authDomain: "new-restoke.firebaseapp.com",
    databaseURL: "https://new-restoke.firebaseio.com",
    storageBucket: "new-restoke.appspot.com",
    messagingSenderId: "963544826606"
  };

  const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
  };

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'sellStock/:id', component: SellStockComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/addProduct', component: AddProductComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    StaffComponent,
    SellStockComponent,
    ServingComponent,
    CompleteComponent,
    AdminComponent,
    AddProductComponent,
    EditStockInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FirebaseService,
    DateTimeService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
