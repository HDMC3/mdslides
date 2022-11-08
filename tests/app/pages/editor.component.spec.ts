import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbDialogModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { MdEditorService } from '../../../src/app/core/services/md-editor.service';
import { PresentationFileService } from '../../../src/app/core/services/presentation-file.service';
import { PresentationService } from '../../../src/app/core/services/presentation.service';
import { ThemeService } from '../../../src/app/shared/services/theme.service';

import { EditorComponent } from '../../../src/app/pages/editor/editor.component';
import { RouterTestingModule } from '@angular/router/testing';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn()
    }));

describe('EditorComponent', () => {
    let component: EditorComponent;
    let fixture: ComponentFixture<EditorComponent>;
    let compiled: HTMLElement;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbSidebarModule.forRoot(),
                NbDialogModule.forRoot(),
                NbToastrModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                MdEditorService,
                ThemeService,
                PresentationService,
                PresentationFileService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should match the snapshot', () => {
        expect(compiled).toMatchSnapshot();
    });
});
