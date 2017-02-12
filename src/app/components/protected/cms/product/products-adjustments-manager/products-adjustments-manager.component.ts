import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-products-adjustments-manager',
  templateUrl: './products-adjustments-manager.component.html',
  styleUrls: ['./products-adjustments-manager.component.scss']
})
export class ProductsAdjustmentsManagerComponent implements OnInit {

  @Input() productId: any;

  //refernce to the specific product's adjustments
  productAdjustmentsAFObject: FirebaseObjectObservable<any[]>;

  //refernce to the specific product's adjustments populated
  productAdjustmentsAFListPopulated: Observable<any[]>;

  //reference to the general adjustments "table"
  adjustmentsProductsAFList: FirebaseListObservable<any[]>;

  //all adjustments
  adjustmentsAFList: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
    ) { }

  ngOnInit() {

    this.productAdjustmentsAFObject = this.af.database.object('/productsAdjustments/'+this.productId);
    this.adjustmentsProductsAFList = this.af.database.list('/adjustmentsProducts');
    this.adjustmentsAFList = this.af.database.list('/adjustments');
    this.productAdjustmentsAFListPopulated = this.relationsManager.populateRelationWith('productsAdjustments', 'adjustments', this.productId);

  }

  addAdjustment(adjustmentKey) {

    if (adjustmentKey.length){
      this.relationsManager.setRelation('productsAdjustments', 'adjustmentsProducts', this.productId, adjustmentKey, true).then(()=>{
        console.log("done");
      });
    }

  }

  removeAdjustment(adjustmentKey) {

    this.relationsManager.setRelation('productsAdjustments', 'adjustmentsProducts', this.productId, adjustmentKey, null).then(()=>{
      console.log("done");
    });

  }


}
