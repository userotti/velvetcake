import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray }   from '@angular/forms';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';

import { Location }                 from '@angular/common';
import { Subscription, Observable }             from 'rxjs';
import { Product }             from '../../../../../models/product.model';
import { Tag }             from '../../../../../models/tag.model';
import { ProductCategory }             from '../../../../../models/product-category.model';


@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  @Input() product: Product;
  @Output() onClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {

  }

  clicked(){
    this.onClick.emit(this.product)
  }

}
