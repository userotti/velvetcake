import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import { RelationManagerService }             from '../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  itemObservable: FirebaseObjectObservable<any[]>;
  subscription: Subscription;
  item: any;
  selected_product: any;
  products: any[];

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    private relationManager: RelationManagerService

  ) {

  }

  ngOnInit() {

    this.item = {};
    this.products = [];

    this.subscription = this.route.params.switchMap((params: Params) => {
      return this.itemObservable = this.af.database.object('/tags/'+params['id'])
    }).subscribe((item) => {
      this.item = item;
    });


  }

  deleteItem() {
    this.itemObservable.remove().then(item => {

      this.relationManager.itemDeletedCleanup('tagsProducts', 'productsTags', this.item.$key);

    }).then(item => {
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


  listProducts() {
    // this.products.map((product, index)=>{
    //   if
    // })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
