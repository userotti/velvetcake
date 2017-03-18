import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product.model';

@Pipe({ name: 'filterProductByDescription' })
export class FilterProductByDescription implements PipeTransform {
  transform(products: Product[], string) {

    if (products){
        return products.filter(product => product.description.toLowerCase().includes(string.toLowerCase()));
    } else {
      return [];
    }

  }
}
