import { Component, Input, Output, ElementRef, HostListener, EventEmitter } from '@angular/core';
import { Slide } from 'src/app/data/interfaces/slide';

@Component({
    selector: 'app-miniature-slide',
    templateUrl: './miniature-slide.component.html',
    styleUrls: ['./miniature-slide.component.css']
})
export class MiniatureSlideComponent {

    @Output()
    private deleteMiniature: EventEmitter<number>;

    @Output()
    // eslint-disable-next-line no-use-before-define
    private selectMiniature: EventEmitter<MiniatureSlideComponent>;

    @Input() slide!: Slide;
    @Input() index!: number;

    constructor(
        public elementRef: ElementRef<HTMLElement>
    ) {
        this.deleteMiniature = new EventEmitter();
        this.selectMiniature = new EventEmitter();
    }

    @HostListener('click')
    onComponentClick() {
        this.selectMiniature.emit(this);
    }

    deleteSlide(e: any) {
        e.stopPropagation();
        this.deleteMiniature.emit(this.index);
    }

}
