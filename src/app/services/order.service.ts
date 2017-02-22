import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { Order }             from '../models/order.model';

@Injectable()
export class OrderService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllOrders(queryObject):Observable<Order[]> {
    return this.af.database.list('/orders', queryObject)
            .map(Order.fromJsonList);
  }

  findOrderByKey(key):Observable<Order> {
    return this.af.database.object('/orders/'+key)
            .map(Order.fromJson);
  }


  createNewOrder() {
    return this.firebaseRef.database().ref('/orders').push({});
  }

  deleteOrder(order: Order) {
    return this.af.database.list('/orders').remove(order.$key);
  }

  saveOrder(order: Order): firebase.Promise<void>  {
    //remove undefined keys
    return this.af.database.object('/orders/'+order.$key).update(order.toStrippedJson());

  }


}
