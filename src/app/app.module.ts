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
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StaffComponent } from './components/staff/staff.component';
import { SellStockComponent } from './components/sell-stock/sell-stock.component';

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
  { path: 'sellStock', component: SellStockComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    StaffComponent,
    SellStockComponent
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
    DateTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
