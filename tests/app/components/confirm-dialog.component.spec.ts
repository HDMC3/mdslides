import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDialogModule, NbDialogRef, NbIconModule, NbThemeModule } from '@nebular/theme';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../../../src/app/components/confirm-dialog/confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;
    let compiled: HTMLElement;

    const nbDialogRef = {
        close() { },
        componentRef: {},
        onBackdropClick: new Observable<MouseEvent>(),
        onClose: new Observable()
    };
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmDialogComponent],
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbCardModule,
                NbIconModule,
                NbEvaIconsModule,
                NbButtonModule,
                NbDialogModule.forRoot()
            ],
            providers: [{ provide: NbDialogRef, useValue: nbDialogRef }]
        })
            .compileComponents();
        // TestBed.inject<any>(NbDialogRef);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
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
