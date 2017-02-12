import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-products-add-ons-manager',
  templateUrl: './products-add-ons-manager.component.html',
  styleUrls: ['./products-add-ons-manager.component.scss']
})
export class ProductsAddOnsManagerComponent implements OnInit {

  @Input() productId: any;

  //refernce to the specific product's addOns
  productAddOnsAFObject: FirebaseObjectObservable<any[]>;

  //refernce to the specific product's addOns populated
  productAddOnsAFListPopulated: Observable<any[]>;

  //reference to the general addOns "table"
  addOnsProductsAFList: FirebaseListObservable<any[]>;

  //all addOns
  addOnsAFList: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
    ) { }

  ngOnInit() {

    this.productAddOnsAFObject = this.af.database.object('/productsAddOns/'+this.productId);
    this.addOnsProductsAFList = this.af.database.list('/addOnsProducts');
    this.addOnsAFList = this.af.database.list('/add-ons');
    this.productAddOnsAFListPopulated = this.relationsManager.populateRelationWith('productsAddOns', 'add-ons', this.productId);

  }

  addAddOn(addOnKey) {

    if (addOnKey.length){
      this.relationsManager.setRelation('productsAddOns', 'addOnsProducts', this.productId, addOnKey, true).then(()=>{
        console.log("done");
      });
    }

  }

  removeAddOn(addOnKey) {

    this.relationsManager.setRelation('productsAddOns', 'addOnsProducts', this.productId, addOnKey, null).then(()=>{
      console.log("done");
    });

  }


}
