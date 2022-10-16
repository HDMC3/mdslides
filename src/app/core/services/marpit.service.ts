import { Injectable } from '@angular/core';
import { Marpit } from '@marp-team/marpit';
import { marpGaiaTheme } from '../marp-themes/gaia-theme';

@Injectable({
    providedIn: 'root'
})
export class MarpitService {
    private marpit: Marpit;

    constructor() {
        this.marpit = new Marpit({
            markdown: 'default'
        });

        this.marpit.markdown.set({
            html: true
        });
    }

    render(editorValue: string[] | string) {
        const markdown = Array.isArray(editorValue) ? editorValue.join('\n') : editorValue;
        this.marpit.themeSet.default = this.marpit.themeSet.add(marpGaiaTheme);
        return this.marpit.render(markdown);
    }
}
