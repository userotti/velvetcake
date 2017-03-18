import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

import { ProtectedComponent } from './components/protected/protected.component';
import { CmsComponent } from './components/protected/cms/cms.component';
import { ProductsComponent } from './components/protected/cms/products/products.component';
import { ProductComponent } from './components/protected/cms/product/product.component';
import { ProductCategoriesComponent } from './components/protected/cms/product-categories/product-categories.component';
import { ProductCategoryComponent } from './components/protected/cms/product-category/product-category.component';
import { AddOnsComponent } from './components/protected/cms/add-ons/add-ons.component';
import { AddOnComponent } from './components/protected/cms/add-on/add-on.component';
import { AdjustmentComponent } from './components/protected/cms/adjustment/adjustment.component';
import { AdjustmentsComponent } from './components/protected/cms/adjustments/adjustments.component';
import { TagsComponent } from './components/protected/cms/tags/tags.component';
import { TagComponent } from './components/protected/cms/tag/tag.component';

import { ViewOrdersComponent } from './components/protected/orders/view-orders/view-orders.component';
import { ViewOrderComponent } from './components/protected/orders/view-order/view-order.component';

import { ShopComponent } from './components/protected/shop/shop.component';
import { ProductsListingComponent } from './components/protected/shop/products-listing/products-listing.component';
import { AddProductComponent } from './components/protected/shop/add-product/add-product.component';


import { ProfileComponent } from './components/protected/profile/profile.component';
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
      { path: 'profile',  component: ProfileComponent},
      { path: 'shop',

        component: ShopComponent,
        children: [
          { path: '', redirectTo: '/shop/products-listing', pathMatch: 'full' },
          { path: 'products-listing',  component: ProductsListingComponent},
          { path: 'add-product/:id',  component: AddProductComponent},
        ],

      },
      { path: 'orders',
        component: OrdersComponent,
        children: [
          { path: 'view-orders',  component: ViewOrdersComponent},
          { path: 'view-orders/:id',  component: ViewOrderComponent},
        ],
      },

      { path: 'cms',
        component: CmsComponent,
        children: [
          { path: '', redirectTo: '/cms/products', pathMatch: 'full' },
          { path: 'products',  component: ProductsComponent},
          { path: 'products/:id',  component: ProductComponent},
          { path: 'product-categories',  component: ProductCategoriesComponent},
          { path: 'product-categories/:id',  component: ProductCategoryComponent},
          { path: 'add-ons',  component: AddOnsComponent},
          { path: 'add-ons/:id',  component: AddOnComponent},
          { path: 'adjustments',  component: AdjustmentsComponent},
          { path: 'adjustments/:id',  component: AdjustmentComponent},
          { path: 'tags',  component: TagsComponent},
          { path: 'tags/:id',  component: TagComponent},

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
