import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbButtonModule, NbDialogModule, NbDialogService, NbIconModule, NbInputModule, NbThemeModule } from '@nebular/theme';


import { MarpitService } from '../../../src/app/core/services/marpit.service';
import { MdEditorService } from '../../../src/app/core/services/md-editor.service';
import { PresentationService } from '../../../src/app/core/services/presentation.service';
import { CurrentSlideComponent } from '../../../src/app/components/current-slide/current-slide.component';
import { MaxLengthPipe } from 'src/app/shared/pipes/max-length.pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CurrentSlideComponent', () => {
    let component: CurrentSlideComponent;
    let fixture: ComponentFixture<CurrentSlideComponent>;
    let compiled: HTMLElement;
    let presentationService: PresentationService;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [CurrentSlideComponent, MaxLengthPipe],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NbThemeModule.forRoot({ name: 'default' }),
                NbDialogModule.forRoot(),
                NbIconModule,
                NbEvaIconsModule,
                NbButtonModule,
                NbInputModule
            ],
            providers: [
                MdEditorService,
                MarpitService,
                PresentationService,
                NbDialogService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentSlideComponent);
        component = fixture.componentInstance;
        presentationService = TestBed.inject(PresentationService);

        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
        expect(compiled).toMatchSnapshot();
    });

    it('should load current slide when init component', (done) => {
        presentationService.currentSlide$.subscribe(slide => {
            fixture.detectChanges();
            const slideName = compiled.querySelector('.slide-name-container h6');
            const slideNameContent = slideName?.textContent?.replace(/\.\.\./g, '');
            expect(slide?.name).toMatch(new RegExp(`^${slideNameContent}`));
            done();
        });
    });

    it('should show input for edit current slide name', (done) => {
        presentationService.currentSlide$.subscribe(slide => {
            fixture.detectChanges();
            const editNameButton = compiled.querySelector<HTMLButtonElement>('.slide-name-container button');
            editNameButton?.click();
            fixture.detectChanges();
            const inputNameSlide = compiled.querySelector<HTMLInputElement>('.slide-name-container input');
            expect(inputNameSlide).toBeTruthy();
            done();
        });
    });

    it('should not show slide name either zoom buttons', (done) => {
        presentationService.currentSlide$.subscribe(slide => {
            fixture.detectChanges();
            component.currentSlide = undefined;
            fixture.detectChanges();
            const topOptions = compiled.querySelector('.top-options-container');
            const zoomButtons = compiled.querySelector('.zoom-buttons');
            expect(topOptions).toBeNull();
            expect(zoomButtons).toBeNull();
            done();
        });
    });

    it('should increase "--zoom" style property value', (done) => {
        presentationService.currentSlide$.subscribe(slide => {
            const beforeZoom = compiled.style.getPropertyValue('--zoom');
            const zoomButtons = compiled.querySelectorAll<HTMLButtonElement>('.zoom-buttons button');
            const increaseZoomButton = zoomButtons[1];
            increaseZoomButton.click();
            fixture.detectChanges();
            const afterZoom = compiled.style.getPropertyValue('--zoom');
            expect(Number(beforeZoom)).toBeLessThan(Number(afterZoom));
            done();
        });
    });

    it('should increase "--zoom" style property value', (done) => {
        presentationService.currentSlide$.subscribe(slide => {
            const beforeZoom = compiled.style.getPropertyValue('--zoom');
            const zoomButtons = compiled.querySelectorAll<HTMLButtonElement>('.zoom-buttons button');
            const decreaseZoomButton = zoomButtons[0];
            decreaseZoomButton.click();
            fixture.detectChanges();
            const afterZoom = compiled.style.getPropertyValue('--zoom');
            expect(Number(beforeZoom)).toBeGreaterThan(Number(afterZoom));
            done();
        });
    });

    it('"--zoom" style property value should not be greater than 1', () => {
        fixture.detectChanges();
        for (let i = 0; i < 30; i++) {
            component.zoomSlide('max');
        }
        const afterZoom = compiled.style.getPropertyValue('--zoom');
        expect(Number(afterZoom)).toBeLessThanOrEqual(1);
    });

    it('"--zoom" style property value should not be less than or equal 0.15', () => {
        fixture.detectChanges();
        for (let i = 0; i < 30; i++) {
            component.zoomSlide('min');
        }
        const afterZoom = compiled.style.getPropertyValue('--zoom');
        expect(Number(afterZoom)).toBeGreaterThan(0.15);
    });
});
