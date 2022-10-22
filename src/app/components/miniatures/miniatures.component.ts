import { Component, Input, ViewChildren, QueryList, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { Slide } from 'src/app/data/interfaces/slide';
import { MiniatureSlideComponent } from '../miniature-slide/miniature-slide.component';

@Component({
    selector: 'app-miniatures',
    templateUrl: './miniatures.component.html',
    styleUrls: ['./miniatures.component.css']
})
export class MiniaturesComponent implements AfterViewInit, OnDestroy {

    @Input() presentation?: Presentation;
    @ViewChildren(MiniatureSlideComponent) miniatures?: QueryList<MiniatureSlideComponent>;
    selectedMiniature?: MiniatureSlideComponent;
    miniaturesChangesSubscription?: Subscription;
    newSlideCreated: boolean;

    constructor(
        private presentationService: PresentationService,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.newSlideCreated = false;
    }

    ngAfterViewInit(): void {
        if (!this.miniatures) return;
        this.miniaturesChangesSubscription = this.miniatures?.changes
            .subscribe((queryList: QueryList<MiniatureSlideComponent>) => {
                if (this.newSlideCreated && queryList.length > 0) {
                    const newMiniature = queryList.last;
                    this.changeSelectedElement(newMiniature);
                    this.elementRef.nativeElement.querySelector('.miniatures-section')?.scrollTo({
                        left: this.elementRef.nativeElement.scrollWidth,
                        behavior: 'smooth'
                    });
                    this.newSlideCreated = false;
                }
            });

        if (this.miniatures.length > 0) {
            this.changeSelectedElement(this.miniatures.first);
        }
    }

    ngOnDestroy(): void {
        this.miniaturesChangesSubscription?.unsubscribe();
    }

    newSlide() {
        const newSlide = this.presentationService.createSlide();
        this.presentation?.slides.push(newSlide);
        this.newSlideCreated = true;
        this.presentationService.changeCurrentSlide(newSlide);
    }

    selectMiniatureSlide(slideElement: MiniatureSlideComponent) {
        this.changeSelectedElement(slideElement);
        this.presentationService.changeCurrentSlide(slideElement.slide);
    }

    deleteMiniatureSlide(index: number) {
        if (!this.presentation || !this.miniatures || !this.selectedMiniature) return;

        const newSelectedSlideElement = index === this.miniatures.length - 1
            ? this.miniatures.get(index - 1)
            : this.miniatures.get(index + 1);

        if (newSelectedSlideElement) {
            this.selectMiniatureSlide(newSelectedSlideElement);
        }
        this.presentation.slides.splice(index, 1);
        this.presentationService.updateStorage(this.presentation);
    }

    changeSelectedElement(newSelectedElement: MiniatureSlideComponent) {
        this.selectedMiniature?.elementRef.nativeElement.classList.remove('selected-slide');
        newSelectedElement.elementRef.nativeElement.classList.add('selected-slide');
        this.selectedMiniature = newSelectedElement;
    }

    miniatureSlideDrop(event: CdkDragDrop<Slide[]>) {
        if (this.presentation) {
            moveItemInArray(this.presentation.slides, event.previousIndex, event.currentIndex);
            this.presentationService.updateStorage(this.presentation);
        }
    }
}
