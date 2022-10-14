import { Component, ElementRef, OnInit } from '@angular/core';
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { oneDarkTheme } from './editor-theme';

@Component({
    selector: 'app-md-editor',
    templateUrl: './md-editor.component.html',
    styleUrls: ['./md-editor.component.css']
})
export class MdEditorComponent implements OnInit {

    editorInitialized: boolean;

    constructor(private elementRef: ElementRef) {
        this.editorInitialized = false;
    }

    ngOnInit(): void {
        const state = EditorState.create({
            extensions: [
                basicSetup,
                markdown({ codeLanguages: languages }),
                EditorView.domEventHandlers({
                    keyup: (e, v) => {
                    }
                }),
                EditorView.lineWrapping,
                oneDarkTheme
            ]
        });

        const view = new EditorView({
            state,
            parent: this.elementRef.nativeElement
        });

        view.dom.style.height = '100%';
    }

    initEditor() {
    }

}
