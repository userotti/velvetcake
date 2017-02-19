import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { Product }             from '../models/product.model';


@Injectable()
export class ProductService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllProducts(queryObject):Observable<Product[]> {

    return this.af.database.list('/products', queryObject)
            .map(Product.fromJsonList);

  }

  findProductByKey(key):FirebaseObjectObservable<Product> {

    return this.af.database.object('/products/'+key);

  }


  createNewProduct() {

    return this.firebaseRef.database().ref('/products').push({});

  }

  deleteProduct(product: Product) {
    return this.af.database.list('/products').remove(product.$key);
  }

  saveProduct(key, product: any) {

    //remove undefined keys
    Object.keys(product).forEach(key => product[key] === undefined && delete product[key]);
    return this.af.database.object('/products/'+key).update(product);

  }
}
