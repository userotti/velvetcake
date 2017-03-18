import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray }   from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription, Observable }             from 'rxjs';


import { Product }             from '../../../../models/product.model';
import { ProductService }             from '../../../../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  itemsFiltered: any[];
  searchForm: FormGroup;
  products$: Observable<Product[]>;

  constructor(private af: AngularFire,
              private router: Router,
              private productService: ProductService,
              private fb: FormBuilder){

      this.searchForm = fb.group({
        'search':  ['']
      });
  }

  ngOnInit() {

    this.products$ = this.productService.findAllProducts({
      query: {
        orderByChild : "description",
      }
    })

  }

  addNewProduct() {

    this.productService.createNewProduct().then(item => {
      this.router.navigate(['/cms/products', item.key]);
    });

  }

}
