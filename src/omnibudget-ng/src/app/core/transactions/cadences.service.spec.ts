import { TestBed } from '@angular/core/testing';

import { CadencesService } from './cadences.service';

describe('CadencesService', () => {
  let service: CadencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
