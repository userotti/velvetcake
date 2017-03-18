import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-order-line-adjustments-manager',
  templateUrl: './order-line-adjustments-manager.component.html',
  styleUrls: ['./order-line-adjustments-manager.component.scss']
})

export class OrderLineAdjustmentsManagerComponent implements OnInit {

  @Input() productId: any;
  @Input() orderLineId: any;

  // @Input() orderLineId: any;
  //refernce to the specific product's adjustments
  adjustments$: Observable<any[]>;
  orderLineAdjustments$: Observable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
    ) { }

  ngOnInit() {
    this.adjustments$ = this.relationsManager.populateRelationWith('productsAdjustments', 'adjustments', this.productId);
    this.orderLineAdjustments$ = this.relationsManager.populateRelationWith('orderLinesAdjustments', 'adjustments', this.orderLineId);


  }

  addAdjustment(adjustmentKey) {

    if (adjustmentKey.length){
      this.relationsManager.setRelationOnlyOne('orderLinesAdjustments', this.orderLineId, adjustmentKey, true).then(()=>{
        console.log("done");
      });
    }

  }

  removeAdjustment(adjustmentKey) {

    this.relationsManager.setRelationOnlyOne('orderLinesAdjustments', this.orderLineId, adjustmentKey, null).then(()=>{
      console.log("done");
    });

  }

}
