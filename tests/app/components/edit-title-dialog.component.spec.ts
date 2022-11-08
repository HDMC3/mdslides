import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogRef, NbIconModule, NbInputModule, NbThemeModule } from '@nebular/theme';
import { Observable } from 'rxjs';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { Presentation } from 'src/app/data/interfaces/presentation';

import { EditTitleDialogComponent } from '../../../src/app/components/edit-title-dialog/edit-title-dialog.component';

describe('EditTitleDialogComponent', () => {
    let component: EditTitleDialogComponent;
    let fixture: ComponentFixture<EditTitleDialogComponent>;
    let compiled: HTMLElement;

    const inputPresentation: Presentation = {
        id: '',
        creation_date: new Date(),
        title: 'Titulo de presentacion',
        slides: []
    };

    const nbDialogRef = {
        close() { },
        componentRef: {},
        onBackdropClick: new Observable<MouseEvent>(),
        onClose: new Observable()
    };

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [EditTitleDialogComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NbThemeModule.forRoot({ name: 'default' }),
                NbCardModule,
                NbIconModule,
                NbEvaIconsModule,
                NbButtonModule,
                NbInputModule,
                NbDialogModule.forRoot()
            ],
            providers: [
                PresentationService,
                { provide: NbDialogRef, useValue: nbDialogRef }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditTitleDialogComponent);
        component = fixture.componentInstance;
        component.presentation = inputPresentation;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
        expect(compiled).toMatchSnapshot();
    });

    it('presentation title value should not change if title form is invalid', () => {
        const beforeTitleValue = component.presentation.title;
        component.titleForm.controls['title'].setValue('');

        const footerButtons = compiled.querySelectorAll<HTMLButtonElement>('.dialog-footer button');
        const saveButton = footerButtons[1];
        saveButton.click();

        expect(beforeTitleValue).toBe(component.presentation.title);
    });
});
