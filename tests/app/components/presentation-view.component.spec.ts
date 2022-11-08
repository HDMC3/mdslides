import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbThemeModule } from '@nebular/theme';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { PresentationService } from 'src/app/core/services/presentation.service';

import { PresentationViewComponent } from '../../../src/app/components/presentation-view/presentation-view.component';

describe('PresentationViewComponent', () => {
    let component: PresentationViewComponent;
    let fixture: ComponentFixture<PresentationViewComponent>;
    let compiled: HTMLElement;
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [PresentationViewComponent],
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                RouterTestingModule,
                NbIconModule,
                NbEvaIconsModule
            ],
            providers: [
                PresentationService,
                MarpitService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PresentationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
        expect(compiled).toMatchSnapshot();
    });
});
