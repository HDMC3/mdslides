import { TestBed } from '@angular/core/testing';

import { MdEditorService } from '../../../../src/app/core/services/md-editor.service';

describe('MdEditorService', () => {
    let service: MdEditorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MdEditorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit true value', (done) => {
        let changeVisibility = false;
        service.editorVisibility.subscribe(value => {
            if (changeVisibility) {
                expect(value).toBeTruthy();
                done();
            } else {
                changeVisibility = true;
                service.showEditor();
            }
        });
    });

    it('should emit false value', (done) => {
        let changeVisibility = false;
        service.editorVisibility.subscribe(value => {
            if (changeVisibility) {
                expect(value).toBeFalsy();
                done();
            } else {
                changeVisibility = true;
                service.hiddeEditor();
            }
        });
    });
});
