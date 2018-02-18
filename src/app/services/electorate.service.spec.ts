import { TestBed, inject } from '@angular/core/testing';

import { ElectorateService } from './electorate.service';

describe('ElectorateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectorateService]
    });
  });

  it('should be created', inject([ElectorateService], (service: ElectorateService) => {
    expect(service).toBeTruthy();
  }));
});
