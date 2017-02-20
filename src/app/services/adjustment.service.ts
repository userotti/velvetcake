import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { Adjustment }             from '../models/adjustment.model';

@Injectable()
export class AdjustmentService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllAdjustments(queryObject):Observable<Adjustment[]> {
    return this.af.database.list('/adjustments', queryObject)
            .map(Adjustment.fromJsonList);
  }

  findAdjustmentByKey(key):Observable<Adjustment> {
    return this.af.database.object('/adjustments/'+key)
            .map(Adjustment.fromJson);
  }


  createNewAdjustment() {
    return this.firebaseRef.database().ref('/adjustments').push({});
  }

  deleteAdjustment(tag: Adjustment) {
    return this.af.database.list('/adjustments').remove(tag.$key);
  }

  saveAdjustment(adjustment: Adjustment): firebase.Promise<void>  {
    //remove undefined keys
    return this.af.database.object('/adjustments/'+adjustment.$key).update(adjustment.toStrippedJson());

  }


}
