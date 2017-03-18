import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';

import { Product } from '../../../../models/product.model';
import { OrderLine } from '../../../../models/order-line.model';

import { ProductService } from '../../../../services/product.service';
import { RelationManagerService } from '../../../../services/relation-manager.service';
import { OrderLineService } from '../../../../services/order-line.service';


import 'rxjs/add/operator/do';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    product: Product;
    orderLine: OrderLine;

    orderLineForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private fb: FormBuilder,
        private relationsManager: RelationManagerService,
        private orderLineService: OrderLineService) {

        this.orderLineForm = this.fb.group({
            quantity: ['', [Validators.required]],
        })

    }

    ngOnInit() {

        this.route.params.switchMap(params => {
            return this.productService.findProductByKey(params['id']);
        }).take(1).subscribe(product => {
            this.product = product;
            this.orderLineService.createNewOrderLine().then((item) => {



                this.orderLine = OrderLine.fromJson({
                  $key: item.key,
                  quantity: 1,
                  product: this.product.$key
                });


                console.log(AddProductComponent.name, "item", item);
                console.log(AddProductComponent.name, "this.orderLine", this.orderLine);

                this.orderLineForm.patchValue(this.orderLine);


            })
        });

    }

}
