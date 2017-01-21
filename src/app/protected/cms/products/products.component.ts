import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router) {

  }

  ngOnInit() {

    this.isLoading = true;

    this.items = this.af.database.list('/products');
    this.items.subscribe(complete => {
            this.isLoading = false;
        });

  }

  addNewProduct() {

    this.items.push({}).then(item => {
      this.router.navigate(['/cms/products', item.key]);
    })

  }

}
