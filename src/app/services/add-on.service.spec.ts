/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddOnService } from './add-on.service';

describe('AddOnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddOnService]
    });
  });

  it('should ...', inject([AddOnService], (service: AddOnService) => {
    expect(service).toBeTruthy();
  }));
});
