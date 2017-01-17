import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';



import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  itemObservable: FirebaseObjectObservable<any[]>;
  subscription: Subscription;
  product_id: String;
  item: any;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router
  ) {


  }

  ngOnInit() {

    this.item = {}

    this.subscription = this.route.params.switchMap((params: Params) => {
      this.product_id = params['id']
      return this.itemObservable = this.af.database.object('/products/'+params['id'])
    }).subscribe((item) => {
      this.item = item;
    });


  }

  deleteProduct() {
    this.itemObservable.remove().then(item => {
      this.router.navigate(['/cms/products']);
    })
  }

  updateProduct() {
    console.log('UPDATING: this.item: ', this.item);
    this.itemObservable.update({

      description: this.item.description,
      price: this.item.price,


    }).then(item => {
      this.router.navigate(['/cms/products']);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
