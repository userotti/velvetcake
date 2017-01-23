import { Component, Input, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  itemObservable: FirebaseObjectObservable<any[]>;
  productCategoryListObservable: FirebaseListObservable<any[]>;
  subscription: Subscription;
  product_id: String;
  item: any;
  productCategories: any[];
  firebaseRef: any;
  uploading_thumbnail: boolean;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    @Inject(FirebaseApp) firebaseApp: any
  ) {

    this.firebaseRef = firebaseApp;

  }

  ngOnInit() {

    this.item = {}
    this.subscription = this.route.params.switchMap((params: Params) => {
      this.product_id = params['id']
      return this.itemObservable = this.af.database.object('/products/'+params['id'])
    }).subscribe((item) => {
      this.item = item;
    });

    this.productCategoryListObservable = this.af.database.list('/product-categories');
    this.productCategoryListObservable.subscribe((items) => {
      this.productCategories = items;
    });


  }

  deleteProduct() {
    this.itemObservable.remove().then(item => {
      this._location.back();
    })
  }

  uploadImage(event) {

    this.uploading_thumbnail = true;
    // var file = new File([],event.target.file);
    let ref = this.firebaseRef.storage().ref().child('images/'+ 'regular' + this.item.$key);
    var metadata = {
      contentType: 'image/jpeg',
    };

    ref.put(event.target.files[0], metadata).then((snapshot) =>{
      console.log('Uploaded a blob or file!', snapshot);
      this.uploading_thumbnail = false;
      this.item.thumbnail_url = snapshot.downloadURL;
      console.log("this.item.thumbnail_url: ", this.item.thumbnail_url)
    });

  }

  updateItem() {
    console.log('UPDATING: this.item: ', this.item);
    this.itemObservable.update({

      description: this.item.description,
      thumbnail_url: this.item.thumbnail_url,
      detail: this.item.detail,
      diameter: this.item.diameter,
      price: this.item.price,
      product_category: this.item.product_category,



    }).then(item => {
      this._location.back();
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
