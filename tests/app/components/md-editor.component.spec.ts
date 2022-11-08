import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdEditorService } from '../../../src/app/core/services/md-editor.service';

import { MdEditorComponent } from '../../../src/app/components/md-editor/md-editor.component';

describe('MdEditorComponent', () => {
    let component: MdEditorComponent;
    let fixture: ComponentFixture<MdEditorComponent>;
    let compiled: HTMLElement;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [MdEditorComponent]
        })
            .compileComponents();
        TestBed.inject(MdEditorService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MdEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoudl match snapshot', () => {
        expect(compiled).toMatchSnapshot();
    });
});
