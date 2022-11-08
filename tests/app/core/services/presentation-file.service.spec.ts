import { TestBed } from '@angular/core/testing';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';

import { PresentationFileService } from '../../../../src/app/core/services/presentation-file.service';

describe('PresentationFileService', () => {
    let service: PresentationFileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbToastrModule.forRoot()
            ]
        });
        service = TestBed.inject(PresentationFileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
