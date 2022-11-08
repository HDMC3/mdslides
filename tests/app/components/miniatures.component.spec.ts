import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbDialogModule, NbDialogService, NbIconModule, NbThemeModule } from '@nebular/theme';
import { MiniatureSlideComponent } from 'src/app/components/miniature-slide/miniature-slide.component';
import { MdEditorService } from 'src/app/core/services/md-editor.service';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { MaxLengthPipe } from 'src/app/shared/pipes/max-length.pipe';

import { MiniaturesComponent } from '../../../src/app/components/miniatures/miniatures.component';

describe('MiniaturesComponent', () => {
    let component: MiniaturesComponent;
    let fixture: ComponentFixture<MiniaturesComponent>;
    let compiled: HTMLElement;
    let presentationService: PresentationService;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                MiniaturesComponent,
                MiniatureSlideComponent,
                MaxLengthPipe
            ],
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbIconModule,
                NbEvaIconsModule,
                DragDropModule,
                NbDialogModule.forRoot()
            ],
            providers: [
                MdEditorService,
                NbDialogService,
                PresentationService
            ]
        })
            .compileComponents();
        presentationService = TestBed.inject(PresentationService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MiniaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should increase number of miniature slide elements', (done) => {
        let newSlideAdded = false;
        const miniatures = compiled.querySelectorAll('app-miniature-slide');
        const beforeLength = miniatures.length;

        presentationService.presentation$.subscribe(presentation => {
            if (newSlideAdded) {
                component.presentation = presentation;
                fixture.detectChanges();
                const afterLength = compiled.querySelectorAll('app-miniature-slide').length;
                expect(afterLength).toBeGreaterThan(beforeLength);
                done();
            } else {
                newSlideAdded = true;
                presentationService.addNewSlide('Nueva diapositiva');
            }
        });
    });

    it('should decrease number of miniature slide elements', (done) => {
        let slideDeleted = false;
        const miniatures = compiled.querySelectorAll('app-miniature-slide');
        const beforeLength = miniatures.length;
        presentationService.presentation$.subscribe(presentation => {
            if (slideDeleted) {
                component.presentation = presentation;
                fixture.detectChanges();
                const afterLength = compiled.querySelectorAll('app-miniature-slide').length;
                expect(afterLength).toBeLessThan(beforeLength);
                done();
            } else {
                slideDeleted = true;
                presentationService.deleteSlide(1);
            }
        });
    });
});
