import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

import { ProtectedComponent } from './components/protected/protected.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';


import { CmsComponent } from './components/protected/cms/cms.component';
import { ProductsComponent } from './components/protected/cms/products/products.component';
import { ProductComponent } from './components/protected/cms/product/product.component';
import { ProductCategoriesComponent } from './components/protected/cms/product-categories/product-categories.component';
import { ProductCategoryComponent } from './components/protected/cms/product-category/product-category.component';
import { AddOnsComponent } from './components/protected/cms/add-ons/add-ons.component';
import { AddOnComponent } from './components/protected/cms/add-on/add-on.component';
import { AdjustmentComponent } from './components/protected/cms/adjustment/adjustment.component';
import { AdjustmentsComponent } from './components/protected/cms/adjustments/adjustments.component';


import { OrdersComponent } from './components/protected/orders/orders.component';
import { ReportsComponent } from './components/protected/reports/reports.component';
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
