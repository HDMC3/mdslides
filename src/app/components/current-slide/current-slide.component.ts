import { Component, ElementRef, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { MdEditorService } from 'src/app/core/services/md-editor.service';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { MarpThemeData } from 'src/app/core/types/marp-theme-data';
import { Slide } from 'src/app/data/interfaces/slide';
import { FormValidators } from 'src/app/shared/form-validators';
import { MarpitThemesDialogComponent } from '../marpit-themes-dialog/marpit-themes-dialog.component';

@Component({
    selector: 'app-current-slide',
    templateUrl: './current-slide.component.html',
    styleUrls: ['./current-slide.component.css']
})
export class CurrentSlideComponent implements OnInit, AfterViewInit {

    @HostBinding('style.--zoom') componentStyle = window.innerWidth <= 500 ? '0.3' : '0.4';
    editorValue: string[];
    editorValueStr: string;
    editingSlideName: boolean;
    slideNameFormControl: FormControl;
    currentSlide?: Slide;
    currentTheme?: MarpThemeData;

    constructor(
        private mdEditorService: MdEditorService,
        private marpitService: MarpitService,
        private presentationService: PresentationService,
        private componentRef: ElementRef,
        private nbDialogService: NbDialogService
    ) {
        this.editorValue = [];
        this.editorValueStr = '';
        this.editingSlideName = false;
        this.slideNameFormControl = new FormControl('', [Validators.required, FormValidators.noEmpty]);
    }

    ngOnInit(): void {
        this.presentationService.currentSlide$.subscribe(slide => {
            this.currentSlide = slide;
            if (!slide) return;
            this.editingSlideName = false;
            this.slideNameFormControl.setValue(slide.name);
            this.renderSlide(slide.code);
        });

        this.marpitService.currentTheme$.subscribe(theme => {
            this.renderSlide(this.editorValue);
            this.currentTheme = theme;
        });
    }

    ngAfterViewInit() {
        this.mdEditorService.editorValue.subscribe(editorChangeData => {
            const newEditorValueStr = editorChangeData.value.join('');
            if (this.editorValueStr === newEditorValueStr) return;
            this.renderSlide(editorChangeData.value);
            this.editorValueStr = newEditorValueStr;
            this.editorValue = editorChangeData.value;
        });
    }

    zoomSlide(action: 'max' | 'min') {
        const currentZoom = this.componentRef.nativeElement.style.getPropertyValue('--zoom');
        const newZoom = action === 'max' ? Number.parseFloat(currentZoom) + 0.05 : Number.parseFloat(currentZoom) - 0.05;

        if (newZoom > 1 || newZoom <= 0.15) return;

        this.componentRef?.nativeElement.style.setProperty('--zoom', `${newZoom}`);
    }

    renderSlide(editorValue: string[]) {
        const currentSlideContainer = this.componentRef.nativeElement.querySelector('.current-slide-container');
        if (!currentSlideContainer) throw new Error();

        let shadowRoot = currentSlideContainer.shadowRoot;
        if (!shadowRoot) shadowRoot = currentSlideContainer.attachShadow({ mode: 'open' });

        const { html, css } = this.marpitService.render(editorValue);
        shadowRoot.innerHTML = `<style>${css}\n.marpit{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(var(--zoom)); box-shadow: var(--shadow);}</style>\n${html}`;
        shadowRoot.querySelectorAll('section').forEach((el: any) => {
            if (el.id !== '1') el.remove();
        });
    }

    editSlideName() {
        this.editingSlideName = true;
    }

    saveSlideName() {
        if (!this.currentSlide) throw new Error();
        if (this.slideNameFormControl.invalid) return;
        this.currentSlide.name = this.slideNameFormControl.value;
        this.presentationService.updateStorage();
        this.editingSlideName = false;
    }

    openMarpitThemesDialog() {
        this.nbDialogService.open(MarpitThemesDialogComponent, {
            context: {
                currentTheme: this.currentTheme
            }
        });
    }

}
