import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { v4 } from 'uuid';
import { getDefaultPresentation } from '../default-presentation';

@Injectable({
    providedIn: 'root'
})
export class PresentationService {
    private _presentation: BehaviorSubject<Presentation>;
    private DEFAULT_PRESENTATION: Presentation;

    constructor(private location: Location) {
        this.DEFAULT_PRESENTATION = getDefaultPresentation(v4());
        this._presentation = new BehaviorSubject<Presentation>(this.DEFAULT_PRESENTATION);
    }

    initPresentation(id: string) {
        const storagePresentation = localStorage.getItem(id);
        if (storagePresentation) {
            const presentation: Presentation = JSON.parse(storagePresentation);
            this._presentation.next(presentation);
            return presentation;
        }

        this.location.replaceState(`/${this.DEFAULT_PRESENTATION.id}`);
        localStorage.setItem(this.DEFAULT_PRESENTATION.id, JSON.stringify(this.DEFAULT_PRESENTATION));
        this._presentation.next(this.DEFAULT_PRESENTATION);
        return this.DEFAULT_PRESENTATION;

    }

    get presentation() {
        return this._presentation.asObservable();
    }
}
