import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { RoutingModule }     from './routing.module';

import { AngularFireModule, AuthProviders, AuthMethods, FirebaseApp } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './auth-guard.service';
import { ProtectedComponent } from './components/protected/protected.component';

import { OrdersComponent } from './components/protected/orders/orders.component';
import { ReportsComponent } from './components/protected/reports/reports.component';
import { CmsComponent } from './components/protected/cms/cms.component';


import { ProductsComponent } from './components/protected/cms/products/products.component';
import { ProductCategoriesComponent } from './components/protected/cms/product-categories/product-categories.component';
import { ProductComponent } from './components/protected/cms/product/product.component';
import { AddOnsComponent } from './components/protected/cms/add-ons/add-ons.component';
import { AdjustmentsComponent } from './components/protected/cms/adjustments/adjustments.component';
import { ProductCategoryComponent } from './components/protected/cms/product-category/product-category.component';
import { AddOnComponent } from './components/protected/cms/add-on/add-on.component';
import { AdjustmentComponent } from './components/protected/cms/adjustment/adjustment.component';
import { TagsComponent } from './components/protected/cms/tags/tags.component';
import { TagComponent } from './components/protected/cms/tag/tag.component';
import { ProductsTagsManagerComponent } from './components/protected/cms/product/products-tags-manager/products-tags-manager.component';
import { ProductsAdjustmentsManagerComponent } from './components/protected/cms/product/products-adjustments-manager/products-adjustments-manager.component';
import { ProductsAddOnsManagerComponent } from './components/protected/cms/product/products-add-ons-manager/products-add-ons-manager.component';
import { ProductImagesComponent } from './components/protected/cms/product/product-images/product-images.component';

import { RelationManagerService } from './services/relation-manager.service';
import { ProductService } from './services/product.service';
import { TagService } from './services/tag.service';
import { ProductCategoryService } from './services/product-category.service';
import { AdjustmentService } from './services/adjustment.service';
import { AddOnService } from './services/add-on.service';


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
    AdjustmentComponent,
    TagsComponent,
    TagComponent,
    ProductsTagsManagerComponent,
    ProductsAdjustmentsManagerComponent,
    ProductsAddOnsManagerComponent,
    ProductImagesComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RoutingModule
  ],
  providers: [
    AuthGuard,
    RelationManagerService,
    ProductService,
    TagService,
    ProductCategoryService,
    AdjustmentService,
    AddOnService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
