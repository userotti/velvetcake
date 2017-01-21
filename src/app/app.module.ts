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

import { OrdersComponent } from './protected/orders/orders.component';
import { ReportsComponent } from './protected/reports/reports.component';
import { CmsComponent } from './protected/cms/cms.component';


import { ProductsComponent } from './protected/cms/products/products.component';
import { ProductCategoriesComponent } from './protected/cms/product-categories/product-categories.component';
import { ProductComponent } from './protected/cms/product/product.component';
import { AddOnsComponent } from './protected/cms/add-ons/add-ons.component';
import { AdjustmentsComponent } from './protected/cms/adjustments/adjustments.component';
import { ProductCategoryComponent } from './protected/cms/product-category/product-category.component';
import { AddOnComponent } from './protected/cms/add-on/add-on.component';
import { AdjustmentComponent } from './protected/cms/adjustment/adjustment.component';



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
    OrdersComponent,
    ProductComponent,
    AddOnsComponent,
    AdjustmentsComponent,
    ProductCategoryComponent,
    AddOnComponent,
    AdjustmentComponent
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
