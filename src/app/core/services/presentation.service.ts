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
    private _currentSlide$: BehaviorSubject<Slide>;
    private presentation: Presentation;

    constructor(private location: Location) {
        this.presentation = getInitialPresentation(v4());
        this._presentation$ = new BehaviorSubject<Presentation>(this.presentation);
        this._currentSlide$ = new BehaviorSubject<Slide>(this.presentation.slides[0]);
    }

    initPresentation(id: string) {
        const storagePresentationStr = localStorage.getItem(id);
        if (storagePresentationStr) {
            const storagePresentation = JSON.parse(storagePresentationStr);
            this._presentation$.next(storagePresentation);
            this.presentation = storagePresentation;
            return storagePresentation;
        }

        this.location.replaceState(`/${this.presentation.id}`);
        this.updateStorage(this.presentation);
        this._presentation$.next(this.presentation);
        return this.presentation;
    }

    createSlide() {
        const storagePresentation = this.getPresentationStorage();
        const newSlide = getNewSlide();
        storagePresentation.slides.push(newSlide);
        this.updateStorage(storagePresentation);
        return newSlide;
    }

    private getPresentationStorage() {
        const storagePresentationStr = localStorage.getItem(this.presentation.id);
        if (!storagePresentationStr) throw new Error('Problema al crear diapositiva');
        const storagePresentation: Presentation = JSON.parse(storagePresentationStr);
        return storagePresentation;
    }

    updateStorage(presentation: Presentation) {
        this.presentation = presentation;
        const presentationStr = JSON.stringify(presentation);
        localStorage.setItem(presentation.id, presentationStr);
    }

    changeCurrentSlide(slide: Slide) {
        this._currentSlide$.next(slide);
    }

    get presentation$() {
        return this._presentation$.asObservable();
    }

    get currentSlide$() {
        return this._currentSlide$.asObservable();
    }
}
