import { Component, ElementRef, HostBinding } from '@angular/core';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { MdEditorService } from 'src/app/core/services/md-editor.service';

@Component({
    selector: 'app-current-slide',
    templateUrl: './current-slide.component.html',
    styleUrls: ['./current-slide.component.css']
})
export class CurrentSlideComponent {

    @HostBinding('style') componentStyle = window.innerWidth <= 500 ? '--zoom: 0.3' : '--zoom: 0.4';
    editorValueStr: string;

    constructor(
        private mdEditorService: MdEditorService,
        private marpitService: MarpitService,
        private componentRef: ElementRef
    ) {
        this.editorValueStr = '';
        this.mdEditorService.editorValue.subscribe(editorChangeData => {
            const newEditorValueStr = editorChangeData.value.join('');
            if (this.editorValueStr === newEditorValueStr) return;
            this.renderSlide(editorChangeData.value);
            this.editorValueStr = newEditorValueStr;
        });
    }

    zoomSlide(action: 'max' | 'min') {
        if (!this.componentRef) return;

        const currentZoom = this.componentRef.nativeElement.style.getPropertyValue('--zoom');
        const newZoom = action === 'max' ? Number.parseFloat(currentZoom) + 0.05 : Number.parseFloat(currentZoom) - 0.05;

        if (newZoom > 1 || newZoom <= 0.15) return;

        this.componentRef?.nativeElement.style.setProperty('--zoom', `${newZoom}`);
    }

    renderSlide(editorValue: string[]) {
        const currentSlideContainer = this.componentRef.nativeElement.querySelector('.current-slide-container');
        if (!currentSlideContainer) return;

        let shadowRoot = currentSlideContainer.shadowRoot;
        if (!shadowRoot) shadowRoot = currentSlideContainer.attachShadow({ mode: 'open' });

        const { html, css } = this.marpitService.render(editorValue);
        shadowRoot.innerHTML = `<style>${css}\n.marpit{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(var(--zoom)); box-shadow: var(--shadow);}</style>\n${html}`;
        shadowRoot.querySelectorAll('section').forEach((el: any) => {
            if (el.id !== '1') el.remove();
        });
    }

}
