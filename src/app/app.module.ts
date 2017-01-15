import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule }     from './routing.module';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './auth-guard.service';
import { ProtectedComponent } from './protected/protected.component';
import { CmsComponent } from './cms/cms.component';
import { ReportsComponent } from './reports/reports.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { OrdersComponent } from './orders/orders.component';



const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent,
    ProtectedComponent,
    CmsComponent,
    ReportsComponent,
    ProductsComponent,
    ProductCategoriesComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RoutingModule
  ],
  providers: [
    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
