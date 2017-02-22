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
import { ProductService }             from '../../../../services/product.service';

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
  productCategoryListObservable: FirebaseListObservable<ProductCategory[]>;
  productForm: FormGroup;
  product: Product;
  firebaseRef: any;
  uploading_thumbnail: boolean;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    @Inject(FirebaseApp) firebaseApp: any,
    private fb: FormBuilder,
    private relationsManager: RelationManagerService,
    private productService: ProductService)
    {

    this.firebaseRef = firebaseApp;

    console.log("this.firebaseRef: ", this.firebaseRef);

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

    this.route.params.switchMap((params: Params) => {
      return this.productService.findProductByKey(params['id']);
    }).take(1).subscribe((product: Product) => {

      this.loading = null;
      this.product = product;
      console.log(this.product);
      this.productForm.patchValue(this.product);

    });

    this.productCategoryListObservable = this.af.database.list('/product-categories');

  }

  deleteProduct() {
    this.loading = "Deleting...";
    this.productService.deleteProduct(this.product).then(item => {

      this.relationsManager.itemDeletedCleanup('productsTags', 'tagsProducts', this.product.$key).then(()=>{
        // this.loading = null;
        this._location.back();
      });

    })
  }

  uploadImage(imageNamePrefix, file) {

    this.uploading_thumbnail = true;
    let ref = this.firebaseRef.storage().ref().child('images/'+ imageNamePrefix + '-' + this.product.$key);
    var metadata = {
      contentType: 'image/jpeg',
    };

    return ref.put(file, metadata);

  }

  uploadThumbnail(event) {

    this.uploadImage('thumbnail', event.target.files[0]).then((snapshot)=>{
      this.uploading_thumbnail = false;
      this.productForm.patchValue({
        thumbnail_url: snapshot.downloadURL,
      });
    });

  }

  updateItem() {

    this.loading = 'Saving...';
    this.productService.saveProduct(this.product.$key, this.productForm.value).then(product => {

    }).then(item => {
      this.loading = null;
    })
  }

}
