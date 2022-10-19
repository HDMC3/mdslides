import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditorChangeData } from '../types/editor-change-data';
@Injectable({
    providedIn: 'root'
})
export class MdEditorService {
    private _editorValue: BehaviorSubject<EditorChangeData>;

    constructor() {
        this._editorValue = new BehaviorSubject<EditorChangeData>({ value: [''], clearEditor: true });
    }

    changeEditorValue(newValue: EditorChangeData) {
        this._editorValue.next(newValue);
    }

    get editorValue() {
        return this._editorValue.asObservable();
    }
}
