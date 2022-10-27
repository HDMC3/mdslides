import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { Slide } from 'src/app/data/interfaces/slide';
import { v4 } from 'uuid';
import { getInitialPresentation } from '../default-models/initial-presentation';
import { getNewSlide } from '../default-models/new-slide';

@Injectable({
    providedIn: 'root'
})
export class PresentationService {
    private _presentation$: BehaviorSubject<Presentation>;
    private _currentSlide$: BehaviorSubject<Slide | undefined>;
    private presentation: Presentation;
    private currentSlide: Slide | undefined;

    constructor(private location: Location) {
        this.presentation = getInitialPresentation(v4());
        this._presentation$ = new BehaviorSubject<Presentation>(this.presentation);
        this.currentSlide = this.presentation.slides[0];
        this._currentSlide$ = new BehaviorSubject<Slide | undefined>(this.currentSlide);
    }

    initPresentation(id: string) {
        const storagePresentationStr = localStorage.getItem(id);
        if (storagePresentationStr) {
            const storagePresentation = JSON.parse(storagePresentationStr);
            this._presentation$.next(storagePresentation);
            this._currentSlide$.next(storagePresentation.slides[0]);
            this.presentation = storagePresentation;
            return storagePresentation;
        }

        this.location.replaceState(`/${this.presentation.id}`);
        this.updateStorage(this.presentation);
        this._presentation$.next(this.presentation);
        this._currentSlide$.next(this.presentation.slides[0]);
        return this.presentation;
    }

    addNewSlide(name?: string) {
        const newSlide = getNewSlide(name);
        this.presentation.slides.push(newSlide);
        this._presentation$.next(this.presentation);
        this.updateStorage();
        return newSlide;
    }

    deleteSlide(index: number) {
        this.presentation.slides.splice(index, 1);
        this._presentation$.next(this.presentation);
        this.updateStorage(this.presentation);
    }

    reorderSlides(event: CdkDragDrop<Slide[]>) {
        moveItemInArray(this.presentation.slides, event.previousIndex, event.currentIndex);
        this._presentation$.next(this.presentation);
        this.updateStorage(this.presentation);
    }

    updateStorage(presentation?: Presentation) {
        if (presentation) {
            this.presentation = presentation;
            const presentationStr = JSON.stringify(presentation);
            localStorage.setItem(presentation.id, presentationStr);
            return;
        }
        const presentationStr = JSON.stringify(this.presentation);
        localStorage.setItem(this.presentation.id, presentationStr);
    }

    changeCurrentSlide(slide: Slide | undefined) {
        this.currentSlide = slide;
        this._currentSlide$.next(slide);
    }

    updateCurrentSlideCode(editorValue: string[]) {
        if (this.currentSlide) {
            this.currentSlide.code = editorValue;
        }
        this.updateStorage(this.presentation);
    }

    get presentation$() {
        return this._presentation$.asObservable();
    }

    get currentSlide$() {
        return this._currentSlide$.asObservable();
    }

    private getPresentationStorage() {
        const storagePresentationStr = localStorage.getItem(this.presentation.id);
        if (!storagePresentationStr) throw new Error('Problema al crear diapositiva');

        const storagePresentation: Presentation = JSON.parse(storagePresentationStr);
        return storagePresentation;
    }
}
