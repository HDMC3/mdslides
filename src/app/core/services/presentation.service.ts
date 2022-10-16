import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { DEFAULT_PRESENTATION } from '../default-presentation';

@Injectable({
    providedIn: 'root'
})
export class PresentationService {
    private _presentation: BehaviorSubject<Presentation> = new BehaviorSubject(DEFAULT_PRESENTATION);

    constructor() { }

    initPresentation(id: string) {
        const storagePresentation = localStorage.getItem(id);
        if (storagePresentation) {
            const presentation = JSON.parse(storagePresentation);
            this._presentation.next(presentation);
            return presentation;
        }

        this._presentation.next(DEFAULT_PRESENTATION);
        return DEFAULT_PRESENTATION;

    }

    get presentation() {
        return this._presentation.asObservable();
    }
}
