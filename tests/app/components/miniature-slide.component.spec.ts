import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbThemeModule } from '@nebular/theme';
import { Slide } from 'src/app/data/interfaces/slide';
import { MaxLengthPipe } from 'src/app/shared/pipes/max-length.pipe';

import { MiniatureSlideComponent } from '../../../src/app/components/miniature-slide/miniature-slide.component';

describe('MiniatureSlideComponent', () => {
    let component: MiniatureSlideComponent;
    let fixture: ComponentFixture<MiniatureSlideComponent>;
    let compiled: HTMLElement;
    const inputSlide: Slide = {
        id: '',
        name: 'Nombre de diapositiva',
        code: []
    };

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                MiniatureSlideComponent,
                MaxLengthPipe
            ],
            imports: [
                NbThemeModule.forRoot({ name: 'default' }),
                NbIconModule,
                NbEvaIconsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MiniatureSlideComponent);
        component = fixture.componentInstance;
        component.slide = inputSlide;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call deleteSlide function', () => {
        jest.spyOn(component, 'deleteSlide');
        const deleteButton = compiled.querySelector('button');
        deleteButton?.click();
        expect(component.deleteSlide).toBeCalled();
    });
});
