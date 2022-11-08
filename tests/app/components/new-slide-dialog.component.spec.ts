import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogRef, NbInputModule, NbThemeModule } from '@nebular/theme';
import { Observable } from 'rxjs';

import { NewSlideDialogComponent } from '../../../src/app/components/new-slide-dialog/new-slide-dialog.component';

describe('NewSlideDialogComponent', () => {
    let component: NewSlideDialogComponent;
    let fixture: ComponentFixture<NewSlideDialogComponent>;
    let compiled: HTMLElement;
    let componentNbDialogRef: NbDialogRef<any>;

    const nbDialogRef = {
        close() {},
        componentRef: {},
        onBackdropClick: new Observable<MouseEvent>(),
        onClose: new Observable<any>()
    };

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [NewSlideDialogComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NbThemeModule.forRoot({ name: 'default' }),
                NbCardModule,
                NbInputModule,
                NbButtonModule
            ],
            providers: [
                { provide: NbDialogRef, useValue: nbDialogRef }
            ]
        })
            .compileComponents();

        componentNbDialogRef = TestBed.inject(NbDialogRef);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewSlideDialogComponent);
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

    it('should not close modal when form is invalid', () => {
        jest.spyOn(componentNbDialogRef, 'close');
        const buttons = compiled.querySelectorAll<HTMLButtonElement>('.dialog-footer button');
        const saveButton = buttons[1];
        component.nameControl.setValue('');
        saveButton.click();
        expect(componentNbDialogRef.close).not.toBeCalled();
    });

    it('should close modal with slide name value when form is valid', () => {
        jest.spyOn(componentNbDialogRef, 'close');
        const nameNewSlide = 'Nombre de diapositiva';
        const buttons = compiled.querySelectorAll<HTMLButtonElement>('.dialog-footer button');
        const saveButton = buttons[1];
        component.nameControl.setValue(nameNewSlide);
        saveButton.click();
        expect(componentNbDialogRef.close).toBeCalledWith({ name: nameNewSlide });
    });
});
