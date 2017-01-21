import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

import { ProtectedComponent } from './protected/protected.component';

import { DashboardComponent } from './dashboard/dashboard.component';


import { CmsComponent } from './protected/cms/cms.component';
import { ProductsComponent } from './protected/cms/products/products.component';
import { ProductComponent } from './protected/cms/product/product.component';
import { ProductCategoriesComponent } from './protected/cms/product-categories/product-categories.component';
import { ProductCategoryComponent } from './protected/cms/product-category/product-category.component';
import { AddOnsComponent } from './protected/cms/add-ons/add-ons.component';
import { AddOnComponent } from './protected/cms/add-on/add-on.component';
import { AdjustmentComponent } from './protected/cms/adjustment/adjustment.component';
import { AdjustmentsComponent } from './protected/cms/adjustments/adjustments.component';


import { OrdersComponent } from './protected/orders/orders.component';
import { ReportsComponent } from './protected/reports/reports.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome',  component: WelcomeComponent },
  { path: 'login',  component: LoginComponent },
  {
    path: '',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',  component: DashboardComponent},
      { path: 'orders',  component: OrdersComponent},
      { path: 'cms',
          component: CmsComponent,
          children: [
            { path: 'products',  component: ProductsComponent},
            { path: 'products/:id',  component: ProductComponent},
            { path: 'product-categories',  component: ProductCategoriesComponent},
            { path: 'product-categories/:id',  component: ProductCategoryComponent},
            { path: 'add-ons',  component: AddOnsComponent},
            { path: 'add-ons/:id',  component: AddOnComponent},
            { path: 'adjustments',  component: AdjustmentsComponent},
            { path: 'adjustments/:id',  component: AdjustmentComponent},

      ]
    },
    { path: 'reports',  component: ReportsComponent},

  ]
},







]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
