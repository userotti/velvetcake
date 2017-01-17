import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {

  }

  ngOnInit() {

    this.items = this.af.database.list('/product-categories');


  }

}
