import { Component, Input, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray }   from '@angular/forms';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription, Observable }             from 'rxjs';

import { Product }             from '../../../../models/product.model';
import { Tag }             from '../../../../models/tag.model';
import { ProductCategory }             from '../../../../models/product-category.model';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/forkJoin';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading = true;
  productObservable: FirebaseObjectObservable<any>;
  productsTagsObservable: FirebaseObjectObservable<any[]>;



  productCategoryListObservable: FirebaseListObservable<ProductCategory[]>;
  tagListObservable: FirebaseListObservable<Tag[]>;

  productForm: FormGroup;
  productsTagsForm: FormGroup;

  productData: any;
  productsTags: Array<any>;

  productsTagsData: any;
  tagsData: Array<any>;

  productId: string;

  tagsKeysArray: Array<string>;

  firebaseRef: any;
  uploading_thumbnail: boolean;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    @Inject(FirebaseApp) firebaseApp: any,
    private fb: FormBuilder)
    {

    this.firebaseRef = firebaseApp;

    this.productForm = this.fb.group({
      description: ['', [Validators.required]],
      thumbnail_url: [''],
      detail: [''],
      diameter: [''],
      price: [''],
      product_category: [''],
      selectedTag: ['']
    })

    this.productsTagsForm = this.fb.group({
      tags: this.fb.array([])
    })

  }

  ngOnInit() {

    this.route.params.take(1).subscribe((params: Params) => {
      this.productId = params['id'];
      this.productObservable = this.af.database.object('/products/'+params['id']);
      this.productsTagsObservable = this.af.database.object('/productsTags/'+params['id']);
    });

    this.tagListObservable = this.af.database.list('/tags');
    this.productCategoryListObservable = this.af.database.list('/product-categories');


    Observable.combineLatest([
      this.productObservable,
      this.productsTagsObservable,
      this.tagListObservable,
      this.productCategoryListObservable]).take(1).subscribe((data)=>{

        this.loading = false;
        this.productData = data[0];
        this.productsTagsData = data[1];
        this.tagsData = data[2];

        this.productForm.setValue({
          description: this.productData.description,
          thumbnail_url: this.productData.thumbnail_url,
          detail: this.productData.detail,
          diameter: this.productData.diameter,
          price: this.productData.price,
          product_category: this.productData.product_category,
          selectedTag: ''
        });

        this.productsTags = this.tagsData.filter(tag => this.productsTagsData.hasOwnProperty(tag.$key));

      });

  }






  deleteProduct() {
    this.productObservable.remove().then(item => {

      //Save the relationship data
      this.productsTagsObservable.remove();

      //Save the revers relationship data
      for (let tag of this.productsTags){
        this.af.database.object('/tagsProducts/'+tag.$key+'/' + this.productData.$key).remove();
      }

    }).then(item => {
      this._location.back();
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
    });

  }

  addTag() {

    let tag_id = this.productForm.get('selectedTag').value;
    if ((this.productsTags.filter(tag => tag.$key == tag_id).length == 0) && (tag_id.length)){
      this.productsTags.push(this.tagsData.filter(tag => {
        return tag.$key == this.productForm.get('selectedTag').value
      })[0]);
    }
  }

  removeTag(tagId) {
    this.productsTags = this.productsTags.filter(tag => {
      return !(tag.$key === tagId)
    });
  }

  updateItem() {

    //Save the product data
    this.productObservable.set({

      description: this.productForm.get('description').value,
      thumbnail_url: this.productForm.get('thumbnail_url').value,
      detail: this.productForm.get('detail').value,
      diameter: this.productForm.get('diameter').value,
      price: this.productForm.get('price').value,
      product_category: this.productForm.get('product_category').value,

    }).then(product => {

      //Save the relationship data
      let tagsObject = {}
      for (let tag of this.productsTags){
        tagsObject[tag.$key] = true;
      }
      this.productsTagsObservable.set(tagsObject);

      //Save the revers relationship data
      for (let tag of this.productsTags){
        let newEntry = {}
        newEntry[this.productData.$key] = true;
        this.af.database.object('/tagsProducts/'+tag.$key).update(newEntry);
      }



    }).then(item => {
      this._location.back();
    })
  }

}
