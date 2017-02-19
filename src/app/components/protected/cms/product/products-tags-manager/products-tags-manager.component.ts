import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-products-tags-manager',
  templateUrl: './products-tags-manager.component.html',
  styleUrls: ['./products-tags-manager.component.scss']
})
export class ProductsTagsManagerComponent implements OnInit {

  @Input() productId: any;

  //refernce to the specific product's tags
  productTagsAFObject: FirebaseObjectObservable<any[]>;

  //refernce to the specific product's tags populated
  productTagsAFListPopulated: Observable<any[]>;

  //reference to the general tags "table"
  tagsProductsAFList: FirebaseListObservable<any[]>;

  //all tags
  tagsAFList: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
    ) { }

  ngOnInit() {

    console.log("productId: ", this.productId);

    this.productTagsAFObject = this.af.database.object('/productsTags/'+this.productId);
    this.tagsProductsAFList = this.af.database.list('/tagsProducts');
    this.tagsAFList = this.af.database.list('/tags');
    this.productTagsAFListPopulated = this.relationsManager.populateRelationWith('productsTags', 'tags', this.productId);

  }

  addTag(tagKey) {

    if (tagKey.length){
      this.relationsManager.setRelation('productsTags', 'tagsProducts', this.productId, tagKey, true).then(()=>{
        console.log("done");
      });
    }

  }

  removeTag(tagKey) {

    this.relationsManager.setRelation('productsTags', 'tagsProducts', this.productId, tagKey, null).then(()=>{
      console.log("done");
    });

  }


}
