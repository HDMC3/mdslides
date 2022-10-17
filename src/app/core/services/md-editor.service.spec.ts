import { TestBed } from '@angular/core/testing';

import { MdEditorService } from './md-editor.service';

describe('MdEditorService', () => {
  let service: MdEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
