import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  itemObservable: FirebaseObjectObservable<any[]>;
  subscription: Subscription;
  product_id: String;
  item: any;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location
  ) {


  }

  ngOnInit() {

    this.item = {}

    this.subscription = this.route.params.switchMap((params: Params) => {
      this.product_id = params['id']
      return this.itemObservable = this.af.database.object('/product-categories/'+params['id'])
    }).subscribe((item) => {
      this.item = item;
    });


  }

  deleteItem() {
    this.itemObservable.remove().then(item => {
      this._location.back();
    })
  }

  updateItem() {
    console.log('UPDATING: this.item: ', this.item);
    this.itemObservable.update({

      description: this.item.description,

    }).then(item => {
      this._location.back();
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
