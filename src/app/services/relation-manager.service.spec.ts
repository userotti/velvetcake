/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelationManagerService } from './relation-manager.service';

describe('RelationManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsTagsRelationManagerService]
    });
  });

  it('should ...', inject([RelationManagerService], (service: RelationManagerService) => {
    expect(service).toBeTruthy();
  }));
});
