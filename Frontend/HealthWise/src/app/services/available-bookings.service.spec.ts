import { TestBed } from '@angular/core/testing';

import { AvailableBookingsService } from './available-bookings.service';

describe('AvailableBookingsService', () => {
  let service: AvailableBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
