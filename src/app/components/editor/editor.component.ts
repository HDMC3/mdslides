import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marpit } from '@marp-team/marpit';
import { NbDialogService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { marpGaiaTheme } from 'src/app/core/marp-themes/gaia-theme';
import { Presentation } from 'src/app/data/interfaces/presentation';
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
    currentTheme: string;
    themeButtonIcon: string;
    presentation: Presentation;
    isClickDivider: boolean;
    isMdEditorActive: boolean;
    resizeObserver: ResizeObserver;

    constructor(
        private nbThemeService: NbThemeService,
        private nbSidebarService: NbSidebarService,
        private activatedRoute: ActivatedRoute,
        private nbDialogService: NbDialogService
    ) {
        this.currentTheme = localStorage.getItem('nbTheme') ?? 'default';
        this.themeButtonIcon = this.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';
        this.nbThemeService.changeTheme(this.currentTheme);

        this.presentation = {
            id: '',
            title: 'Mi titulo',
            description: '',
            slides: [],
            creation_date: new Date(),
            modification_date: new Date()
        };

        this.isClickDivider = false;
        this.isMdEditorActive = false;

        this.resizeObserver = new ResizeObserver(() => {
            if (window.innerWidth <= 500 && this.mdEditor && this.currentSlide) {
                this.mdEditor.nativeElement.style = '';
                this.currentSlide.nativeElement.style.width = '';
            }
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(take(1)).subscribe(params => {
            this.presentation.id = params['id'];
        });
    }

    ngAfterViewInit(): void {
        this.currentSlide?.nativeElement.style.setProperty('--zoom', `${window.innerWidth <= 500 ? '0.3' : '0.4'}`);
        this.resizeObserver.observe(document.body);
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
        const markdown = editorValue.join('\n');
        const marpit = new Marpit({
            markdown: 'default'
        });
        marpit.markdown.set({
            html: true
        });

        marpit.themeSet.default = marpit.themeSet.add(marpGaiaTheme);
        const { html, css } = marpit.render(markdown);
        if (this.currentSlide) {
            const currentSlideContainer = this.currentSlide.nativeElement.querySelector('.current-slide-container');
            currentSlideContainer.shadowRoot ?? currentSlideContainer.attachShadow({ mode: 'open' });
            currentSlideContainer.shadowRoot.innerHTML = `<style>${css}\n.marpit{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(var(--zoom));}\nsection{display: none;}\nsection[id="1"]{display: block;}\n</style>\n${html}`;
        }
    }

    zoomSlide(action: 'max' | 'min') {
        if (!this.currentSlide) return;

        const currentZoom = this.currentSlide?.nativeElement.style.getPropertyValue('--zoom');
        const newZoom = action === 'max' ? Number.parseFloat(currentZoom) + 0.05 : Number.parseFloat(currentZoom) - 0.05;

        if (newZoom > 1 || newZoom <= 0.15) return;

        this.currentSlide?.nativeElement.style.setProperty('--zoom', `${newZoom}`);
    }

    changeTheme() {
        const newTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        localStorage.setItem('nbTheme', newTheme);
        this.currentTheme = newTheme;
        this.nbThemeService.changeTheme(newTheme);
        this.themeButtonIcon = newTheme === 'default' ? 'moon-outline' : 'sun-outline';
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
