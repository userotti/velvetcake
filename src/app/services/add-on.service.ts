import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { AddOn }             from '../models/add-on.model';

@Injectable()
export class AddOnService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllAddOns(queryObject):Observable<AddOn[]> {
    return this.af.database.list('/add-ons', queryObject)
            .map(AddOn.fromJsonList);
  }

  findAddOnByKey(key):Observable<AddOn> {
    return this.af.database.object('/add-ons/'+key)
            .map(AddOn.fromJson);
  }


  createNewAddOn() {
    return this.firebaseRef.database().ref('/add-ons').push({});
  }

  deleteAddOn(addOn: AddOn) {
    return this.af.database.list('/add-ons').remove(addOn.$key);
  }

  saveAddOn(addOn: AddOn): firebase.Promise<void>  {
    //remove undefined keys
    return this.af.database.object('/add-ons/'+addOn.$key).update(addOn.toStrippedJson());

  }


}
