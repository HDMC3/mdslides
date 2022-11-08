import { TestBed } from '@angular/core/testing';

import { MARP_DEFAULT_DARK_THEME } from '../../../../src/app/core/marp-themes/default-dark';
import { MarpitService } from '../../../../src/app/core/services/marpit.service';


describe('MarpitService', () => {
    let service: MarpitService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MarpitService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return RenderResult object', () => {
        const result = service.render(['# Head 1', '## Head 2', '### Head 3']);
        expect(result.html).toBeDefined();
        expect(result.css).toBeDefined();
    });

    it('should change marpit theme storage value', () => {
        const beforeTheme = localStorage.getItem('marp-theme');
        service.setMarpitTheme(MARP_DEFAULT_DARK_THEME);
        const afterTheme = localStorage.getItem('marp-theme');
        expect(beforeTheme).not.toEqual(afterTheme);
    });
});
