import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { PresentationService } from 'src/app/core/services/presentation.service';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { Slide } from 'src/app/data/interfaces/slide';
import { MiniatureSlideComponent } from '../miniature-slide/miniature-slide.component';
import { MdEditorService } from 'src/app/core/services/md-editor.service';

@Component({
    selector: 'app-miniatures',
    templateUrl: './miniatures.component.html',
    styleUrls: ['./miniatures.component.css']
})
export class MiniaturesComponent implements OnInit, AfterViewInit, OnDestroy {

    presentation?: Presentation;
    @ViewChildren(MiniatureSlideComponent) miniatures?: QueryList<MiniatureSlideComponent>;
    selectedMiniature?: MiniatureSlideComponent;
    miniaturesChangesSubscription?: Subscription;
    presentationSubscription?: Subscription;
    newSlideCreated: boolean;

    constructor(
        private presentationService: PresentationService,
        private mdEditorService: MdEditorService
    ) {
        this.newSlideCreated = false;
    }

    ngOnInit(): void {
        this.presentationSubscription = this.presentationService.presentation$.subscribe(presentation => {
            this.presentation = presentation;
        });
    }

    ngAfterViewInit(): void {
        if (!this.miniatures) return;
        this.miniaturesChangesSubscription = this.miniatures?.changes
            .subscribe((queryList: QueryList<MiniatureSlideComponent>) => {
                if (this.newSlideCreated && queryList.length > 0) {
                    const newMiniature = queryList.last;
                    this.changeSelectedElement(newMiniature);
                    newMiniature.elementRef.nativeElement.scrollIntoView({ block: 'end', behavior: 'smooth' });
                    this.newSlideCreated = false;
                }
            });

        if (this.miniatures.length > 0) {
            this.changeSelectedElement(this.miniatures.first);
        }
    }

    ngOnDestroy(): void {
        this.miniaturesChangesSubscription?.unsubscribe();
        this.presentationSubscription?.unsubscribe();
    }

    newSlide() {
        const newSlide = this.presentationService.addNewSlide();
        this.newSlideCreated = true;
        this.presentationService.changeCurrentSlide(newSlide);
    }

    selectMiniatureSlide(slideElement: MiniatureSlideComponent) {
        this.changeSelectedElement(slideElement);
        this.presentationService.changeCurrentSlide(slideElement.slide);
        this.mdEditorService.changeEditorValue({ value: slideElement.slide.code, clearEditor: true });
    }

    deleteMiniatureSlide(index: number) {
        if (!this.presentation || !this.miniatures || !this.selectedMiniature) return;

        const newSelectedSlideElement = index === this.miniatures.length - 1
            ? this.miniatures.get(index - 1)
            : this.miniatures.get(index + 1);

        if (newSelectedSlideElement) {
            this.selectMiniatureSlide(newSelectedSlideElement);
        }
        this.presentationService.deleteSlide(index);
    }

    changeSelectedElement(newSelectedElement: MiniatureSlideComponent) {
        this.selectedMiniature?.elementRef.nativeElement.classList.remove('selected-slide');
        newSelectedElement.elementRef.nativeElement.classList.add('selected-slide');
        this.selectedMiniature = newSelectedElement;
    }

    miniatureSlideDrop(event: CdkDragDrop<Slide[]>) {
        if (this.presentation) {
            this.presentationService.reorderSlides(event);
        }
    }
}
