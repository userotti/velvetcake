import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription, Observable }             from 'rxjs';

import { ProductCategory }             from '../../../../models/product-category.model';
import { ProductCategoryService }             from '../../../../services/product-category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  productCategories$: Observable<ProductCategory[]>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private productCategoryService: ProductCategoryService) {

  }

  ngOnInit() {

    this.productCategories$ = this.productCategoryService.findAllProductCategories({
      query: {
        orderByChild : "description",
      }
    });

  }

  addNewItem() {

    this.productCategoryService.createNewProductCategory().then(category => {
      this.router.navigate(['/cms/product-categories', category.key]);
    })

  }
}
