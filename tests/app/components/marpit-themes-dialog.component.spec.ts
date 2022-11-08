import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule, NbDialogRef, NbThemeModule } from '@nebular/theme';
import { Observable } from 'rxjs';
import { MarpitService } from 'src/app/core/services/marpit.service';

import { MarpitThemesDialogComponent } from '../../../src/app/components/marpit-themes-dialog/marpit-themes-dialog.component';

describe('MarpitThemesDialogComponent', () => {
    let component: MarpitThemesDialogComponent;
    let fixture: ComponentFixture<MarpitThemesDialogComponent>;
    const nbDialogRef = {
        close() {},
        componentRef: {},
        onBackdropClick: new Observable<MouseEvent>(),
        onClose: new Observable()
    };

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [MarpitThemesDialogComponent],
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbCardModule
            ],
            providers: [
                MarpitService,
                { provide: NbDialogRef, useValue: nbDialogRef }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MarpitThemesDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate correct css linear-gradient', () => {
        const colorsGroups = [
            ['#F00', '#0F0', '#00F', '#FFF'],
            ['#F00', '#0F0', '#00F'],
            ['#369ABC', '#111111', '#00F', '#FFF', '#ABCDEF']
        ];
        const regexGradient = /(#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{6})\s(([0-9]*\.[0-9]+%)|[0-9]+%)\s(([0-9]*\.[0-9]+%)|[0-9]+%)/g;

        for (const colors of colorsGroups) {
            const gradient = component.getCSSGradient(colors);
            const matchResult = gradient.match(regexGradient);
            expect(matchResult?.length).toBe(colors.length);
        }
    });
});
