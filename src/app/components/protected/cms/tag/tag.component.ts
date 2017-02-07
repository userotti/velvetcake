import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

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


    // this.productListObservable = this.af.database.list('/products', {
    //   query: {
    //     orderByChild : "description",
    //   }
    // });
    //
    // this.productListObservable.subscribe(items => {
    //   console.log("products: ", items);
    //   this.products = items;
    //   this.selected_product = this.products[0].$key;
    // });


  }

  deleteItem() {
    this.itemObservable.remove().then(item => {
      this.af.database.object('/tagsProducts/'+this.item.$key).remove();

      this.af.database.list('/productsTags').take(1).subscribe((productsTags) => {
          console.log("productsTags: ", productsTags);
          for (let productTag of productsTags) {
            if (productTag.hasOwnProperty(this.item.$key)){
              console.log("this.item.$key: ", this.item.$key);
              this.af.database.object('/productsTags/'+ productTag.$key + '/' + this.item.$key).remove();
            }
          }
      });

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
