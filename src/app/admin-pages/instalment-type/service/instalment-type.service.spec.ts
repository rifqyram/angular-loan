import { TestBed } from '@angular/core/testing';

import { InstalmentTypeService } from './instalment-type.service';

describe('InstalmentTypeService', () => {
  let service: InstalmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstalmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
