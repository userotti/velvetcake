/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdjustmentService } from './adjustment.service';

describe('AdjustmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdjustmentService]
    });
  });

  it('should ...', inject([AdjustmentService], (service: AdjustmentService) => {
    expect(service).toBeTruthy();
  }));
});
