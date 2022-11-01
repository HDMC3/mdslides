import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MdEditorService } from 'src/app/core/services/md-editor.service';
import { PresentationFileService } from 'src/app/core/services/presentation-file.service';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { EditorChangeData } from 'src/app/core/types/editor-change-data';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditTitleDialogComponent } from '../../components/edit-title-dialog/edit-title-dialog.component';

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
    editorValueSubscription?: Subscription;
    downloadingFile: boolean;
    loadingFile: boolean;

    constructor(
        private themeService: ThemeService,
        private nbSidebarService: NbSidebarService,
        private activatedRoute: ActivatedRoute,
        private nbDialogService: NbDialogService,
        private presentationService: PresentationService,
        private mdEditorService: MdEditorService,
        private presentatioFileService: PresentationFileService,
        private router: Router
    ) {
        this.themeButtonIcon = this.themeService.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';

        this.isClickDivider = false;
        this.isMdEditorActive = false;
        this.downloadingFile = false;
        this.loadingFile = false;

        this.resizeObserver = new ResizeObserver(() => {
            if (window.innerWidth <= 500 && this.mdEditor && this.currentSlide) {
                this.mdEditor.nativeElement.style = '';
                this.currentSlide.nativeElement.style.width = '';
            }

            this.fixWidthsWhenResize();

            this.setEditorContainerHeight();
        });
    }

    ngOnInit(): void {
        this.presentationService.presentation$.pipe().subscribe(presentation => {
            this.presentation = presentation;
            if (presentation.slides.length === 0) {
                this.mdEditorService.hiddeEditor();
                return;
            }
            this.presentationService.changeCurrentSlide(presentation.slides[0]);
            this.setEditorValue({ value: presentation.slides[0].code, clearEditor: true });
        });
    }

    ngAfterViewInit(): void {
        this.editorValueSubscription = this.mdEditorService.editorValue.subscribe(editorChangeData => {
            this.presentationService.updateCurrentSlideCode(editorChangeData.value);
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

        if (!this.mdEditor || !this.currentSlide || !this.divider) throw new Error();

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
        if (!this.mdEditor || !this.currentSlide) throw new Error();

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

    fixWidthsWhenResize() {
        if (!this.mdEditor || !this.divider || !this.currentSlide) throw new Error();

        if (window.innerHeight <= 500) return;

        const mdEditorWidth = this.mdEditor.nativeElement.getBoundingClientRect().width;
        const dividerWidth = this.divider.nativeElement.getBoundingClientRect().width;
        const currentSlideWidth = this.currentSlide.nativeElement.getBoundingClientRect().width;
        const totalWidthElements = mdEditorWidth + dividerWidth + currentSlideWidth;
        if (totalWidthElements < window.innerWidth) {
            const offset = (window.innerWidth - totalWidthElements) / 2;
            this.mdEditor.nativeElement.style.width = `${mdEditorWidth + offset}px`;
            this.currentSlide.nativeElement.style.width = `${currentSlideWidth + offset}px`;
        }
    }

    showPresentation() {
        if (this.presentation && this.presentation.slides.length > 0) {
            this.router.navigate(['presentation'], { relativeTo: this.activatedRoute });
        }
    }

    downLoadPresentation() {
        this.downloadingFile = true;
        this.presentatioFileService.downloadPresentation().finally(() => { this.downloadingFile = false; });
    }

    openPresentationFile() {
        this.loadingFile = true;
        this.nbDialogService.open(ConfirmDialogComponent, {
            context: {
                message: 'Los cambios que no se hayan descargado se perderan. Desea continuar?',
                confirmButtonText: 'Abrir'
            }
        }).onClose.pipe(take(1)).subscribe({
            next: (result: any) => {
                if (result?.confirm) {
                    this.presentatioFileService.openPresentationFile();
                }
                this.loadingFile = false;
            },
            error: _ => {
                this.loadingFile = false;
            }
        });
    }

    createNewPresentation() {
        this.nbDialogService.open(ConfirmDialogComponent, {
            context: {
                message: 'Los cambios que no se hayan descargado se perderan. Desea continuar?',
                confirmButtonText: 'Crear'
            }
        }).onClose.pipe(take(1)).subscribe({
            next: result => {
                if (result?.confirm) {
                    this.presentationService.createNewPresentation();
                }
            }
        });
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
