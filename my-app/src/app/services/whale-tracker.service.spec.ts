import { TestBed } from '@angular/core/testing';

import { WhaleTrackerService } from './whale-tracker.service';

describe('WhaleTrackerService', () => {
  let service: WhaleTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhaleTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
