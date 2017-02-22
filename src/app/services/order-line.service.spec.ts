/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderLineService } from './order-line.service';

describe('OrderLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderLineService]
    });
  });

  it('should ...', inject([OrderLineService], (service: OrderLineService) => {
    expect(service).toBeTruthy();
  }));
});
