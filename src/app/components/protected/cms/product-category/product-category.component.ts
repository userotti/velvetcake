import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import 'rxjs/add/operator/switchMap';

import { ProductCategory }             from '../../../../models/product-category.model';
import { ProductCategoryService }             from '../../../../services/product-category.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  loading = true;
  productCategory: ProductCategory;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    private productCategoryService: ProductCategoryService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      description: '',
      detail: ''
    })

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      return this.productCategoryService.findProductCategoryByKey(params['id']);
    }).take(1).subscribe((productCategory: ProductCategory) => {
      this.loading = null;
      this.productCategory = productCategory;
      this.form.patchValue(productCategory);
    });

  }

  deleteItem() {
    this.productCategoryService.deleteProductCategory(this.productCategory).then(item => {
      this._location.back();
    });
  }

  updateItem() {

    this.productCategoryService.saveProductCategory(this.productCategory.$key, this.form.value).then(() => {
      this._location.back();
    });


  }


}
