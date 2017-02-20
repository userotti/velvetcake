import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { ProductCategory }             from '../models/product-category.model';

@Injectable()
export class ProductCategoryService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllProductCategories(queryObject):Observable<ProductCategory[]> {
    return this.af.database.list('/product-categories', queryObject)
            .map(ProductCategory.fromJsonList);
  }

  findProductCategoryByKey(key):FirebaseObjectObservable<ProductCategory> {
    return this.af.database.object('/product-categories/'+key);
  }


  createNewProductCategory() {
    return this.firebaseRef.database().ref('/product-categories').push({});
  }

  deleteProductCategory(tag: ProductCategory) {
    return this.af.database.list('/product-categories').remove(tag.$key);
  }

  saveProductCategory(key, productCategory: any): firebase.Promise<void>  {
    //remove undefined keys
    Object.keys(productCategory).forEach(key => productCategory[key] === undefined && delete productCategory[key]);
    return this.af.database.object('/product-categories/'+key).update(productCategory);

  }

}
