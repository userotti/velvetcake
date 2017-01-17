import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

import { ProtectedComponent } from './protected/protected.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CmsComponent } from './cms/cms.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { OrdersComponent } from './protected/orders/orders.component';



import { ReportsComponent } from './reports/reports.component';



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
