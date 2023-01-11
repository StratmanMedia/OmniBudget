import { TestBed } from '@angular/core/testing';

import { CadenceService } from './cadence.service';

describe('CadenceService', () => {
  let service: CadenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
