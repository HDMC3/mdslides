import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
    @ViewChild('currentSlide', { read: ElementRef }) currentSlide?: ElementRef;
    themeButtonIcon: string;
    presentation?: Presentation;
    isClickDivider: boolean;
    isMdEditorActive: boolean;
    resizeObserver: ResizeObserver;
    currentSlideHtml?: string;
    currentSlideCss?: string;
    selectedSlide?: Slide;
    editorValueSubscription?: Subscription;

    constructor(
        private themeService: ThemeService,
        private nbSidebarService: NbSidebarService,
        private activatedRoute: ActivatedRoute,
        private nbDialogService: NbDialogService,
        private presentationService: PresentationService,
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
        });
    }

    ngAfterViewInit(): void {
        this.presentationService.initial$.pipe(take(1)).subscribe(presentation => {
            this.setEditorValue({ value: presentation.slides[0].code, clearEditor: true });
        });

        this.editorValueSubscription = this.mdEditorService.editorValue.subscribe(editorChangeData => {
            this.onMdEditorChangeValue(editorChangeData.value);
        });
        this.resizeObserver.observe(document.body);
        this.setEditorContainerHeight();
    }

    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
        this.editorValueSubscription?.unsubscribe();
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

    onChangeMiniatureSlide(selectedSlide: Slide) {
        this.selectedSlide = selectedSlide;
        this.setEditorValue({ value: selectedSlide.code, clearEditor: true });
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
        if (this.selectedSlide) this.selectedSlide.code = editorValue;
        if (this.presentation) this.presentationService.updateStorage(this.presentation);
    }


    setEditorValue(newEditorData: EditorChangeData) {
        this.mdEditorService.changeEditorValue(newEditorData);
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
