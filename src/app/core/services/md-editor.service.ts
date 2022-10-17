import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MdEditorService {
    private _editorValue: BehaviorSubject<string[]>;

    constructor() {
        this._editorValue = new BehaviorSubject<string[]>(['']);
    }

    changeEditorValue(newValue: string[]) {
        this._editorValue.next(newValue);
    }

    get editorValue() {
        return this._editorValue.asObservable();
    }
}
