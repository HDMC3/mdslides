import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { v4 } from 'uuid';
import { getInitialPresentation } from '../default-models/initial-presentation';
import { getNewSlide } from '../default-models/new-slide';

@Injectable({
    providedIn: 'root'
})
export class PresentationService {
    private _presentation$: BehaviorSubject<Presentation>;
    private presentation: Presentation;

    constructor(private location: Location) {
        this.presentation = getInitialPresentation(v4());
        this._presentation$ = new BehaviorSubject<Presentation>(this.presentation);
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

    getPresentationStorage() {
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

    get initial$() {
        return this._presentation$.asObservable();
    }
}
