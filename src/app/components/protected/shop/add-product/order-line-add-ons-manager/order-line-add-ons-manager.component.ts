import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-order-line-add-ons-manager',
  templateUrl: './order-line-add-ons-manager.component.html',
  styleUrls: ['./order-line-add-ons-manager.component.scss']
})
export class OrderLineAddOnsManagerComponent implements OnInit {

  @Input() productId: any;
  @Input() orderLineId: any;

  // @Input() orderLineId: any;
  //refernce to the specific product's addOns
  addOns$: Observable<any[]>;
  orderLineAddOns$: Observable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
    ) { }

  ngOnInit() {
    this.addOns$ = this.relationsManager.populateRelationWith('productsAddOns', 'add-ons', this.productId);
    this.orderLineAddOns$ = this.relationsManager.populateRelationWith('orderLinesAddOns', 'add-ons', this.orderLineId);


  }

  addAddOn(addOnKey) {

    if (addOnKey.length){
      this.relationsManager.setRelationOnlyOne('orderLinesAddOns', this.orderLineId, addOnKey, true).then(()=>{
        console.log("done");
      });
    }

  }

  removeAddOn(addOnKey) {

    this.relationsManager.setRelationOnlyOne('orderLinesAddOns', this.orderLineId, addOnKey, null).then(()=>{
      console.log("done");
    });

  }


}
