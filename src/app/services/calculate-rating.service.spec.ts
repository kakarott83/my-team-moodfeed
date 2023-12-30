import { TestBed } from '@angular/core/testing';

import { CalculateRatingService } from './calculate-rating.service';

describe('CalculateRatingService', () => {
  let service: CalculateRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
