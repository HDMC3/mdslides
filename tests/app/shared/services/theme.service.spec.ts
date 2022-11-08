import { TestBed } from '@angular/core/testing';
import { NbThemeModule } from '@nebular/theme';

import { ThemeService } from '../../../../src/app/shared/services/theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NbThemeModule.forRoot({ name: 'default' })
            ]
        });
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should change theme to dark', () => {
        const currentTheme = service.currentTheme;
        service.changeTheme();
        expect(currentTheme).not.toEqual(service.currentTheme);
    });

    it('should set theme value in localstorage', () => {
        const currentTheme = localStorage.getItem('nbTheme');
        service.changeTheme();
        const newTheme = localStorage.getItem('nbTheme');
        expect(currentTheme).not.toEqual(newTheme);
    });
});
