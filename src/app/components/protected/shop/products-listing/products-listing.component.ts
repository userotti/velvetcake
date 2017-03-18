import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { Product }             from '../../../../models/product.model';
import { ProductService }             from '../../../../services/product.service';
import { Subscription, Observable }             from 'rxjs';

import { Tag }             from '../../../../models/tag.model';
import { TagService }             from '../../../../services/tag.service';

import { RelationManagerService }             from '../../../../services/relation-manager.service';
import 'rxjs/add/operator/do';
@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {

  //refernce to the specific product's tags populated
  tagsProductsListPopulated: Observable<any[]>;
  products$: Observable<Product[]>;
  tags$: Observable<Tag[]>;
  selectedTag: Tag;

  loading: boolean;

  constructor(private af: AngularFire,
              private router: Router,
              private productService: ProductService,
              private tagService: TagService,
              private relationManagerService: RelationManagerService) { }

  ngOnInit() {

    this.tags$ = this.tagService.findAllTags({
      query: {
        orderByChild : "description",
      }
    }).do(tags => {

      if (tags.length){
        this.selectTag(tags[0]);
      }

    });


  }

  selectTag(tag: Tag){

    this.selectedTag = tag;
    this.products$ = this.relationManagerService.populateRelationWith('tagsProducts', 'products', tag.$key);

  }

  gotoProduct(product: Product){

      console.log(ProductsListingComponent.name, product);
      this.router.navigate(['/shop/add-product', product.$key]);

  }

}
