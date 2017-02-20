import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

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
  isLoading: boolean;
  searchWord: String;

  constructor(private af: AngularFire,
              private router: Router,
              private productService: ProductService){

  }

  ngOnInit() {

    this.isLoading = true;
    this.searchWord = '';

    this.productService.findAllProducts({
      query: {
        orderByChild : "description",
      }
    }).subscribe(products => {

      console.log("Products: ", products);
      this.isLoading = false;
      this.products = products;
      this.applySearchKeyWord();

    });

  }

  applySearchKeyWord() {

    if (!this.searchWord.length){
      this.itemsFiltered = this.products
    } else {
      this.itemsFiltered = this.products.filter((item, index) => {
        return item.description.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
      });
    }

  }

  addNewProduct() {

    this.productService.createNewProduct().then(item => {

      this.router.navigate(['/cms/products', item.key]);

    });

  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
