import { Injectable, Inject } from '@angular/core';
import { Subscription, Observable }             from 'rxjs';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';



@Injectable()
export class RelationManagerService {

  firebaseRef: any;

  constructor(
    private af:AngularFire,
    @Inject(FirebaseApp) firebaseApp: any,
  ) {

    this.firebaseRef = firebaseApp;

  }

  //used for the listing of related tags
  // ('productsTags', 'tags', 'id-3459889fgdnfkj');
  populateRelationWith(firstRelationNodeName, fromNodeName, firstKey) : Observable<any[]> {

    return this.af.database.object('/'+firstRelationNodeName+'/'+firstKey)
    .switchMap(productsTagsObject => {
      return this.af.database.list('/'+fromNodeName).map((tags, index) => {
        return tags.filter(tag => productsTagsObject.hasOwnProperty(tag.$key))
      })
    })

  }

  //use value null to remove the relations
  setRelation(firstRelationNodeName, secondRelationNodeName, firstKey, secondKey, value):Promise<any> {

    let new_first_relation = {};
    new_first_relation[secondKey] = value;

    let new_second_relation = {};
    new_second_relation[firstKey] = value;

    return Promise.all([
      this.af.database.object('/'+ secondRelationNodeName +'/'+ secondKey).update(new_second_relation),
      this.af.database.object('/'+ firstRelationNodeName +'/'+firstKey).update(new_first_relation)]).then(()=>{
        console.log("Relation set to " + value + " successfully: ", {
          firstRelationNodeName : firstKey,
          secondRelationNodeName : secondKey
        })
      });

  }

  //use value null to remove the relations
  setRelationOnlyOne(firstRelationNodeName, firstKey, secondKey, value):Promise<any> {

    let new_first_relation = {};
    new_first_relation[secondKey] = value;


    return Promise.all([
      this.af.database.object('/'+ firstRelationNodeName +'/'+firstKey).update(new_first_relation)]).then(()=>{
        console.log("Relation set to " + value + " successfully: ", {
          secondRelationNodeName : secondKey
        })
      });

  }


  itemDeletedCleanup(firstRelationNodeName, secondRelationNodeName, firstKey): Promise<any> {

    var promises = [];
    var subscription;

    return new Promise((resolve, reject) => {
      this.af.database.object('/'+ firstRelationNodeName +'/'+firstKey).remove().then(()=>{

        subscription = this.af.database.list('/' + secondRelationNodeName ).map(itemList => {
              return itemList.filter(tag => {
                return tag.hasOwnProperty(firstKey);
              })
          }).subscribe(filteredItemList => {

            subscription.unsubscribe();
            for (let item of filteredItemList) {
              let updatedItem = {}
              updatedItem[firstKey] = null;
              promises.push(this.af.database.object('/'+ secondRelationNodeName + '/'+item.$key).update(updatedItem));
            }

            Promise.all(promises).then(()=>{
              resolve();
            })

          });
      })
    });

  }


}
