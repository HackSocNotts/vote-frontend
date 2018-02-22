import { TestBed, async, inject } from '@angular/core/testing';

import { VoterGuard } from './voter.guard';

describe('VoterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoterGuard]
    });
  });

  it('should ...', inject([VoterGuard], (guard: VoterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
