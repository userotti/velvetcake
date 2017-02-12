import { Component, Input, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray }   from '@angular/forms';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription, Observable }             from 'rxjs';

import { Product }             from '../../../../models/product.model';
import { Tag }             from '../../../../models/tag.model';
import { ProductCategory }             from '../../../../models/product-category.model';

import { RelationManagerService }             from '../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

const TAG = 'ProductComponent';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading = 'Loading...';
  productObservable: FirebaseObjectObservable<any>;
  productCategoryListObservable: FirebaseListObservable<ProductCategory[]>;

  productForm: FormGroup;
  productData: any;
  productId: string;

  firebaseRef: any;
  uploading_thumbnail: boolean;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    @Inject(FirebaseApp) firebaseApp: any,
    private fb: FormBuilder,
    private productsTagsRelationsManager: RelationManagerService)
    {

    this.firebaseRef = firebaseApp;

    this.productForm = this.fb.group({
      description: ['', [Validators.required]],
      thumbnail_url: [''],
      detail: [''],
      diameter: [''],
      price: [''],
      product_category: [''],
    })

  }

  ngOnInit() {

    this.route.params.take(1).subscribe((params: Params) => {
      this.productId = params['id'];
      this.productObservable = this.af.database.object('/products/'+params['id']);
      this.productCategoryListObservable = this.af.database.list('/product-categories');
    });

    this.productObservable.take(1).subscribe(productData => {
      this.loading = null;

      this.productData = productData;

      this.productForm.setValue({
        description: this.productData.description,
        thumbnail_url: this.productData.thumbnail_url,
        detail: this.productData.detail,
        diameter: this.productData.diameter,
        price: this.productData.price,
        product_category: this.productData.product_category,
      });

    });

  }

  deleteProduct() {
    this.loading = "Deleting...";
    this.productObservable.remove().then(item => {
      this.productsTagsRelationsManager.itemDeletedCleanup('productsTags', 'tagsProducts', this.productId).then(()=>{
        // this.loading = null;
        this._location.back();
      });
    })
  }

  uploadImage(event) {

    this.uploading_thumbnail = true;
    let ref = this.firebaseRef.storage().ref().child('images/'+ 'thumbnail-' + this.productId);
    var metadata = {
      contentType: 'image/jpeg',
    };

    ref.put(event.target.files[0], metadata).then((snapshot) =>{
      this.uploading_thumbnail = false;
      this.productForm.patchValue({
        thumbnail_url: snapshot.downloadURL,
      });

      console.log(TAG, "uploadImage: ",  snapshot.downloadURL);

    });

  }

  updateItem() {

    this.loading = 'Saving...';
    //Save the product data
    this.productObservable.set({

      description: this.productForm.get('description').value,
      thumbnail_url: this.productForm.get('thumbnail_url').value,
      detail: this.productForm.get('detail').value,
      diameter: this.productForm.get('diameter').value,
      price: this.productForm.get('price').value,
      product_category: this.productForm.get('product_category').value,

    }).then(product => {

      console.log(TAG, "updateItem: ",  this.productForm.getRawValue());

    }).then(item => {
      this.loading = null;
      // this._location.back();
    })
  }

}
