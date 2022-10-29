import { TestBed } from '@angular/core/testing';

import { PresentationFileService } from './presentation-file.service';

describe('PresentationFileService', () => {
  let service: PresentationFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentationFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
