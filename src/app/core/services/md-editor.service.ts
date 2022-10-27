import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditorChangeData } from '../types/editor-change-data';
@Injectable({
    providedIn: 'root'
})
export class MdEditorService {
    private _editorValue: BehaviorSubject<EditorChangeData>;
    private _editorVisibility: BehaviorSubject<boolean>;

    constructor() {
        this._editorValue = new BehaviorSubject<EditorChangeData>({ value: [''], clearEditor: true });
        this._editorVisibility = new BehaviorSubject<boolean>(true);
    }

    changeEditorValue(newValue: EditorChangeData) {
        this._editorValue.next(newValue);
    }

    hiddeEditor() {
        this._editorVisibility.next(false);
    }

    showEditor() {
        this._editorVisibility.next(true);
    }

    get editorValue() {
        return this._editorValue.asObservable();
    }

    get editorVisibility() {
        return this._editorVisibility.asObservable();
    }
}
