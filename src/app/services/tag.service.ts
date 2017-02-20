import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';

import { Tag }             from '../models/tag.model';

@Injectable()
export class TagService {

  firebaseRef: any;

  constructor(private db:AngularFire,
              @Inject(FirebaseApp) firebaseApp: any,
              private af: AngularFire) {

      this.firebaseRef = firebaseApp;

  }

  findAllTags(queryObject):Observable<Tag[]> {
    return this.af.database.list('/tags', queryObject)
            .map(Tag.fromJsonList);
  }

  findTagByKey(key):FirebaseObjectObservable<Tag> {
    return this.af.database.object('/tags/'+key);
  }


  createNewTag() {
    return this.firebaseRef.database().ref('/tags').push({});
  }

  deleteTag(tag: Tag) {
    return this.af.database.list('/tags').remove(tag.$key);
  }

  saveTag(key, tag: any): firebase.Promise<void>  {
    //remove undefined keys
    Object.keys(tag).forEach(key => tag[key] === undefined && delete tag[key]);
    return this.af.database.object('/tags/'+key).update(tag);

  }

}
