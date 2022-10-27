import { Component, ElementRef, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, HostBinding } from '@angular/core';
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from 'codemirror';
import { ChangeSpec, EditorState } from '@codemirror/state';
import { languages } from '@codemirror/language-data';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDarkTheme } from './editor-theme';
import { MdEditorService } from 'src/app/core/services/md-editor.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-md-editor',
    templateUrl: './md-editor.component.html',
    styleUrls: ['./md-editor.component.css']
})
export class MdEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @Output() valueChange: EventEmitter<string[]>;
    @HostBinding('style.display') displayComponent?: string;
    editorValueSubscription?: Subscription;
    editorInitialized: boolean;
    editorState?: EditorState;
    editorView?: EditorView;

    constructor(
        private elementRef: ElementRef,
        private mdEditorService: MdEditorService
    ) {
        this.editorInitialized = false;
        this.valueChange = new EventEmitter();
    }

    ngOnInit(): void {
        this.editorState = EditorState.create({
            extensions: [
                basicSetup,
                markdown({ codeLanguages: languages }),
                EditorView.domEventHandlers({
                    keyup: (_, v) => {
                        const editorValue = v.state.doc.toJSON();
                        this.mdEditorService.changeEditorValue({ value: editorValue, clearEditor: false });
                    }
                }),
                EditorView.lineWrapping,
                keymap.of([indentWithTab]),
                oneDarkTheme
            ]
        });

        this.editorView = new EditorView({
            state: this.editorState,
            parent: this.elementRef.nativeElement
        });

        this.editorView.dom.style.height = '100%';
    }

    ngAfterViewInit(): void {
        this.editorValueSubscription = this.mdEditorService.editorValue.subscribe(editorChangeData => {
            if (!editorChangeData.clearEditor) return;
            this.editorView?.dispatch({ changes: { from: 0, to: this.editorView.state.doc.length } });
            const changes = editorChangeData.value.map((line, i) => {
                const change: ChangeSpec = {
                    from: 0, insert: line + '\n'
                };
                return change;
            });

            this.editorView?.dispatch({ changes });
        });

        this.mdEditorService.editorVisibility.subscribe(hidde => {
            Promise.resolve().then(() => { this.displayComponent = hidde ? 'inline' : 'none'; });
        });

        setTimeout(() => {
            this.editorView?.focus();
        }, 0);
    }

    ngOnDestroy() {
        this.editorValueSubscription?.unsubscribe();
    }

    initEditor() {
    }

}
