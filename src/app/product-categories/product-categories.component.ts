import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router) {

  }

  ngOnInit() {

    this.isLoading = true;

    this.items = this.af.database.list('/product-categories');
    this.items.subscribe(complete => {
            this.isLoading = false;
        });

  }

  addNewItem() {

    this.items.push({}).then(item => {
      this.router.navigate(['/cms/product-categories', item.key]);
    })

  }
}
