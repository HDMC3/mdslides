import { TestBed } from '@angular/core/testing';

import { MarpitService } from './marpit.service';

describe('MarpitService', () => {
  let service: MarpitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarpitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
