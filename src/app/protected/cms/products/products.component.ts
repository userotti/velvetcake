import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  itemsListObservable: FirebaseListObservable<any[]>;
  items: any[];
  itemsFiltered: any[];
  isLoading: boolean;
  searchWord: String;

  constructor(private af: AngularFire,private router: Router){

  }

  ngOnInit() {

    this.isLoading = true;

    this.itemsListObservable = this.af.database.list('/products', {
      query: {
        orderByChild : "description",
      }
    });

    this.searchWord = '';

    this.itemsListObservable.subscribe(items => {
      console.log("items: ", items);
      this.isLoading = false;
      this.items = items;
      this.applySearchKeyWord();
    });


  }

  applySearchKeyWord() {

    if (!this.searchWord.length){
      this.itemsFiltered = this.items
    } else {
      this.itemsFiltered = this.items.filter((item, index) => {
        return item.description.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1;
      });
    }

  }

  addNewProduct() {
    this.itemsListObservable.push({}).then(item => {
      this.router.navigate(['/cms/products', item.key]);
    })
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}
