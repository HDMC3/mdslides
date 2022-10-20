import { Component, Input, OnChanges, SimpleChanges, ElementRef, HostBinding } from '@angular/core';
import { MdEditorService } from 'src/app/core/services/md-editor.service';

@Component({
    selector: 'app-current-slide',
    templateUrl: './current-slide.component.html',
    styleUrls: ['./current-slide.component.css']
})
export class CurrentSlideComponent implements OnChanges {

    @Input() html?: string;
    @Input() css?: string;
    @Input() comments?: string;
    @HostBinding('style') componentStyle = window.innerWidth <= 500 ? '--zoom: 0.3' : '--zoom: 0.4';

    constructor(private mdEditorService: MdEditorService, private componentRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.renderSlide();
    }

    zoomSlide(action: 'max' | 'min') {
        if (!this.componentRef) return;

        const currentZoom = this.componentRef.nativeElement.style.getPropertyValue('--zoom');
        const newZoom = action === 'max' ? Number.parseFloat(currentZoom) + 0.05 : Number.parseFloat(currentZoom) - 0.05;

        if (newZoom > 1 || newZoom <= 0.15) return;

        this.componentRef?.nativeElement.style.setProperty('--zoom', `${newZoom}`);
    }

    renderSlide() {
        if (!this.html || !this.css) return;
        const currentSlideContainer = this.componentRef.nativeElement.querySelector('.current-slide-container');
        if (!currentSlideContainer) return;
        let shadowRoot = currentSlideContainer.shadowRoot;
        if (!shadowRoot) shadowRoot = currentSlideContainer.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${this.css}\n.marpit{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(var(--zoom)); box-shadow: var(--shadow);}</style>\n${this.html}`;
        shadowRoot.querySelectorAll('section').forEach((el: any) => {
            if (el.id !== '1') el.remove();
        });
    }

}
