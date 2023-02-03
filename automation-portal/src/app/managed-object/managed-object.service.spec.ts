import { TestBed } from '@angular/core/testing';

import { ManagedObjectService } from './managed-object.service';

describe('ManagedObjectService', () => {
  let service: ManagedObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagedObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
