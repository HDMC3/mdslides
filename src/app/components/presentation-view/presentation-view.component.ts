import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { Slide } from 'src/app/data/interfaces/slide';

@Component({
    selector: 'app-presentation-view',
    templateUrl: './presentation-view.component.html',
    styleUrls: ['./presentation-view.component.css']
})
export class PresentationViewComponent implements OnInit, AfterViewInit {

    @ViewChild('slidesTrack') slidesTrack?: ElementRef<HTMLDivElement>;
    isActive: boolean;
    presentation?: Presentation;
    offsetSlidesTrack: number;
    currentSlide?: Slide;
    hiddeActionButtons: boolean;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private presentationService: PresentationService,
        private marpitService: MarpitService
    ) {
        this.isActive = false;
        this.offsetSlidesTrack = 0;
        this.hiddeActionButtons = false;
    }

    ngOnInit(): void {

        this.elementRef.nativeElement.addEventListener('fullscreenchange', (e: any) => {
            if (this.isActive) {
                this.activatedRoute.parent?.params.subscribe(params => {
                    this.router.navigate(['/']);
                });
            }

            if (!this.isActive) this.isActive = true;
        });

        this.presentationService.presentation$.subscribe(presentation => {
            this.presentation = presentation;
        });

        this.presentationService.currentSlide$.subscribe(slide => {
            this.currentSlide = slide;
        });
    }

    ngAfterViewInit(): void {
        this.init();
        setTimeout(() => {
            this.hiddeActionButtons = true;
        }, 1000);
    }

    @HostListener('window:deviceorientation')
    onDeviceOrientation() {
        this.renderSlides();
    }

    async init() {
        try {
            await this.elementRef.nativeElement.requestFullscreen();
        } catch (error) {
            this.router.navigate(['/']);
        }
        this.renderSlides();
    }

    next = () => {
        if (!this.presentation) throw new Error();
        const totalOffset = -this.presentation.slides.length * window.innerWidth;

        if (this.offsetSlidesTrack <= totalOffset) {
            if (document.fullscreenElement) document.exitFullscreen();
            return;
        }

        if (!this.slidesTrack) throw new Error();
        this.offsetSlidesTrack -= window.innerWidth;
        this.slidesTrack.nativeElement.style.transform = `translateX(${this.offsetSlidesTrack}px)`;
    };

    previous = () => {
        if (this.offsetSlidesTrack >= 0) return;

        if (!this.slidesTrack) throw new Error();
        this.offsetSlidesTrack += window.innerWidth;
        this.slidesTrack.nativeElement.style.transform = `translateX(${this.offsetSlidesTrack}px)`;
    };

    @HostListener('document:keyup', ['$event'])
    onComponentKeyup(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft') {
            this.previous();
        }
        if (e.code === 'ArrowRight') {
            this.next();
        }
    }

    renderSlides() {
        if (!this.slidesTrack || !this.presentation) throw new Error();

        const slidesElements = this.slidesTrack.nativeElement.querySelectorAll<HTMLElement>('.slide');
        let currentSlideIndex = 0;
        for (let i = 0; i < this.presentation.slides.length; i++) {
            const slide = this.presentation.slides[i];
            const { html, css } = this.marpitService.render(slide.code);
            const slideElement = slidesElements[i];
            slideElement.style.setProperty('--scale', '1');
            const shadowRoot = slideElement.shadowRoot ?? slideElement.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = `<style>${css}\n.marpit section { transform: scale(var(--scale));}</style>\n${html}`;
            this.slidesTrack.nativeElement.appendChild(slideElement);
            this.scaleSlide(slideElement);
            if (slide === this.currentSlide) {
                currentSlideIndex = i;
            }
        }

        this.offsetSlidesTrack = -currentSlideIndex * window.innerWidth;
        this.slidesTrack.nativeElement.style.transform = `translateX(${this.offsetSlidesTrack}px)`;

        setTimeout(() => {
            this.slidesTrack?.nativeElement.style.setProperty('transition', 'transform 0.2s');
        }, 0);
    }

    scaleSlide(slideElement: HTMLElement) {
        const marpitSlide = slideElement.shadowRoot?.querySelector('section');
        if (!marpitSlide) return;

        const marpitSlideWidth = marpitSlide.getBoundingClientRect().width;
        const marpitSlideHeight = marpitSlide.getBoundingClientRect().height;

        const scale = Math.min(
            window.innerWidth / marpitSlideWidth,
            window.innerHeight / marpitSlideHeight
        );

        marpitSlide.style.setProperty('--scale', `${scale}`);
    }
}
