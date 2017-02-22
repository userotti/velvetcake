import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { Address }             from '../models/address.model';

@Injectable()
export class AddressService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllAddresss(queryObject):Observable<Address[]> {
    return this.af.database.list('/addresses', queryObject)
            .map(Address.fromJsonList);
  }

  findAddressByKey(key):Observable<Address> {
    return this.af.database.object('/addresses/'+key)
            .map(Address.fromJson);
  }


  createNewAddress() {
    return this.firebaseRef.database().ref('/addresses').push({});
  }

  deleteAddress(address: Address) {
    return this.af.database.list('/addresses').remove(address.$key);
  }

  saveAddress(address: Address): firebase.Promise<void>  {
    //remove undefined keys
    return this.af.database.object('/addresses/'+address.$key).update(address.toStrippedJson());

  }


}
