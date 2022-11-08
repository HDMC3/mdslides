import { TestBed } from '@angular/core/testing';

import { PresentationService } from '../../../../src/app/core/services/presentation.service';

describe('PresentationService', () => {
    let service: PresentationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PresentationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a value other than null', () => {
        const presentation = service.initPresentation();
        expect(presentation).not.toBeUndefined();
    });

    it('should set localstorage after initPresentation is called', () => {
        const storageValue = localStorage.getItem('presentation');
        expect(storageValue).not.toBeNull();
    });

    it('should increase the number of slides', (done) => {
        let addingSlide = false;
        let beforeLength = 0;
        service.presentation$.subscribe(p => {
            if (addingSlide) {
                expect(beforeLength).toBeLessThan(p.slides.length);
                done();
            } else {
                beforeLength = p.slides.length;
                addingSlide = true;
                service.addNewSlide();
            }
        });
    });

    it('should decrease the number of slides', (done) => {
        let addingSlide = false;
        let beforeLength = 0;
        service.presentation$.subscribe(p => {
            if (addingSlide) {
                expect(beforeLength).toBeGreaterThan(p.slides.length);
                done();
            } else {
                beforeLength = p.slides.length;
                addingSlide = true;
                service.deleteSlide(1);
            }
        });
    });
});
