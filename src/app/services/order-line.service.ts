import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { OrderLine }             from '../models/order-line.model';

@Injectable()
export class OrderLineService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllOrderLines(queryObject):Observable<OrderLine[]> {
    return this.af.database.list('/order-lines', queryObject)
            .map(OrderLine.fromJsonList);
  }

  findOrderLineByKey(key):Observable<OrderLine> {
    return this.af.database.object('/order-lines/'+key)
            .map(OrderLine.fromJson);
  }


  createNewOrderLine() {
    return this.firebaseRef.database().ref('/order-lines').push({});
  }

  deleteOrderLine(orderLine: OrderLine) {
    return this.af.database.list('/order-lines').remove(orderLine.$key);
  }

  saveOrderLine(orderLine: OrderLine): firebase.Promise<void>  {
    //remove undefined keys
    return this.af.database.object('/order-lines/'+orderLine.$key).update(orderLine.toStrippedJson());

  }


}
