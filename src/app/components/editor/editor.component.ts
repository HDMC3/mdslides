import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { MdEditorService } from 'src/app/core/services/md-editor.service';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { EditorChangeData } from 'src/app/core/types/editor-change-data';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { Slide } from 'src/app/data/interfaces/slide';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { EditTitleDialogComponent } from '../edit-title-dialog/edit-title-dialog.component';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('divider') divider?: ElementRef;
    @ViewChild('mdEditor') mdEditor?: ElementRef;
    @ViewChild('currentSlide') currentSlide?: ElementRef;
    @ViewChild('miniatureSlides') miniatureSlides?: ElementRef<HTMLElement>;
    themeButtonIcon: string;
    presentation?: Presentation;
    isClickDivider: boolean;
    isMdEditorActive: boolean;
    resizeObserver: ResizeObserver;
    selectedSlide?: Slide;
    selectedSlideElement?: HTMLElement;

    constructor(
        private themeService: ThemeService,
        private nbSidebarService: NbSidebarService,
        private activatedRoute: ActivatedRoute,
        private nbDialogService: NbDialogService,
        private presentationService: PresentationService,
        private marpitService: MarpitService,
        private mdEditorService: MdEditorService
    ) {
        this.themeButtonIcon = this.themeService.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';

        this.isClickDivider = false;
        this.isMdEditorActive = false;

        this.resizeObserver = new ResizeObserver(() => {
            if (window.innerWidth <= 500 && this.mdEditor && this.currentSlide) {
                this.mdEditor.nativeElement.style = '';
                this.currentSlide.nativeElement.style.width = '';
            }
            this.setEditorContainerHeight();
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(take(1)).subscribe(params => {
            this.presentation = this.presentationService.initPresentation(params['id']);
            this.selectedSlide = this.presentation?.slides[0];
        });
    }

    ngAfterViewInit(): void {
        this.currentSlide?.nativeElement.style.setProperty('--zoom', `${window.innerWidth <= 500 ? '0.3' : '0.4'}`);

        this.presentationService.initial$.pipe(take(1)).subscribe(presentation => {
            this.setEditorValue({ value: presentation.slides[0].code, clearEditor: true });
            const firstMiniature = document.querySelector<HTMLElement>('div.miniature-slide-card');
            if (firstMiniature) {
                firstMiniature?.classList.add('selected-slide');
                this.selectedSlideElement = firstMiniature;
            }
        });

        this.mdEditorService.editorValue.subscribe(editorChangeData => {
            this.onMdEditorChangeValue(editorChangeData.value);
        });
        this.resizeObserver.observe(document.body);
        this.setEditorContainerHeight();
    }

    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
    }

    @HostListener('pointermove', ['$event'])
    onMouseMoveDivider(e: PointerEvent) {
        if (!this.isClickDivider) return;

        if (!this.mdEditor || !this.currentSlide || !this.divider) return;

        if (window.innerWidth > 500) {
            const offset = e.clientX - this.divider.nativeElement.offsetLeft;
            const newCurrentSlideWidth = this.currentSlide.nativeElement.clientWidth - offset;
            const newMdEditorWidth = this.mdEditor.nativeElement.clientWidth + offset;
            this.currentSlide.nativeElement.style.width = `${newCurrentSlideWidth}px`;
            this.mdEditor.nativeElement.style.width = `${newMdEditorWidth}px`;
        }
    }

    @HostListener('pointerdown', ['$event'])
    onPointerDownDivider(e: any) {
        this.isClickDivider = e.target && e.target.classList.contains('editor-section-divider');
    }

    @HostListener('pointerup', ['$event'])
    onPointerUpDivider(e: any) {
        this.isClickDivider = false;
    }

    switchView() {
        if (!this.mdEditor || !this.currentSlide) return;

        if (!this.isMdEditorActive) {
            this.currentSlide.nativeElement.classList.add('hidde-panel');
            this.mdEditor.nativeElement.classList.remove('hidde-panel');
            this.isMdEditorActive = true;
            return;
        }

        this.mdEditor.nativeElement.classList.add('hidde-panel');
        this.currentSlide.nativeElement.classList.remove('hidde-panel');
        this.isMdEditorActive = false;
    }

    onMdEditorChangeValue(editorValue: string[]) {
        const { html, css } = this.marpitService.render(editorValue);
        this.renderSlide(html, css);
        if (this.selectedSlide) this.selectedSlide.code = editorValue;
        if (this.presentation) this.presentationService.updateStorage(this.presentation);
    }

    renderSlide(html: string, css: string) {
        if (!this.currentSlide) return;
        const currentSlideContainer = this.currentSlide.nativeElement.querySelector('.current-slide-container');
        if (!currentSlideContainer) return;
        let shadowRoot = currentSlideContainer.shadowRoot;
        if (!shadowRoot) shadowRoot = currentSlideContainer.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${css}\n.marpit{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(var(--zoom)); box-shadow: var(--shadow);}</style>\n${html}`;
        shadowRoot.querySelectorAll('section').forEach((el: any) => {
            if (el.id !== '1') el.remove();
        });
    }

    newSlide() {
        const newSlide = this.presentationService.createSlide();
        this.presentation?.slides.push(newSlide);
        this.setEditorValue({ value: newSlide.code, clearEditor: true });
    }

    selectMiniatureSlide(slide: Slide, slideElement: HTMLElement) {
        this.selectedSlide = slide;
        this.changeSelectedElement(slideElement);
        this.setEditorValue({ value: slide.code, clearEditor: true });
    }

    setEditorValue(newEditorData: EditorChangeData) {
        this.mdEditorService.changeEditorValue(newEditorData);
        const { html, css } = this.marpitService.render(newEditorData.value);
        this.renderSlide(html, css);
    }

    zoomSlide(action: 'max' | 'min') {
        if (!this.currentSlide) return;

        const currentZoom = this.currentSlide?.nativeElement.style.getPropertyValue('--zoom');
        const newZoom = action === 'max' ? Number.parseFloat(currentZoom) + 0.05 : Number.parseFloat(currentZoom) - 0.05;

        if (newZoom > 1 || newZoom <= 0.15) return;

        this.currentSlide?.nativeElement.style.setProperty('--zoom', `${newZoom}`);
    }

    deleteSlide(e: MouseEvent, indexSlide: number) {
        e.stopPropagation();

        if (!this.presentation || !this.miniatureSlides || !this.selectedSlideElement) return;

        const slideElements = this.miniatureSlides.nativeElement.querySelectorAll<HTMLElement>('.miniature-slide-card');

        const newSelectedSlideElement = indexSlide === slideElements.length - 1
            ? slideElements[slideElements.length - 2]
            : slideElements[indexSlide + 1];

        const newSelectedSlide = indexSlide === slideElements.length - 1
            ? this.presentation.slides[indexSlide - 1]
            : this.presentation.slides[indexSlide + 1];

        this.selectMiniatureSlide(newSelectedSlide, newSelectedSlideElement);
        this.presentation.slides.splice(indexSlide, 1);
        this.presentationService.updateStorage(this.presentation);
    }

    changeSelectedElement(newSelectedElement: HTMLElement) {
        this.selectedSlideElement?.classList.remove('selected-slide');
        newSelectedElement.classList.add('selected-slide');
        this.selectedSlideElement = newSelectedElement;
    }

    changeTheme() {
        this.themeService.changeTheme();
        this.themeButtonIcon = this.themeService.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';
    }

    setEditorContainerHeight() {
        const header = document.querySelector('nb-layout-header');
        const miniatures = document.querySelector('.miniatures-section');
        const editor = document.querySelector<HTMLElement>('.md-editor');
        if (header && miniatures && editor) {
            const headerH = header.getBoundingClientRect().height;
            const miniaturesH = miniatures.getBoundingClientRect().height;
            const bodyH = document.body.getBoundingClientRect().height;
            editor.style.height = `${bodyH - (headerH + miniaturesH)}px`;
        }
    }

    toggleSidebar() {
        this.nbSidebarService.toggle();
    }

    openEditTitleDialog() {
        this.nbDialogService.open(EditTitleDialogComponent, {
            closeOnBackdropClick: true,
            context: {
                presentation: this.presentation
            }
        });
    }

}
