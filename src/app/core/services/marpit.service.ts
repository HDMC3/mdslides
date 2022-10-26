import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Marpit } from '@marp-team/marpit';
import { MARP_GAIA_THEME } from '../marp-themes/gaia-theme';
import { MarpThemeData } from '../types/marp-theme-data';

@Injectable({
    providedIn: 'root'
})
export class MarpitService {
    private marpit: Marpit;
    private currentTheme: MarpThemeData;
    private _currentTheme$: BehaviorSubject<MarpThemeData>;

    constructor() {
        this.marpit = new Marpit({
            markdown: 'default'
        });

        this.marpit.markdown.set({
            html: true
        });

        this.currentTheme = MARP_GAIA_THEME;
        this._currentTheme$ = new BehaviorSubject(MARP_GAIA_THEME);
        this.marpit.themeSet.default = this.marpit.themeSet.add(this.currentTheme.theme);
    }

    render(editorValue: string[] | string) {
        const markdown = Array.isArray(editorValue) ? editorValue.join('\n') : editorValue;
        return this.marpit.render(markdown);
    }

    setMarpitTheme(themeData: MarpThemeData) {
        this.currentTheme = themeData;
        this.marpit.themeSet.default = this.marpit.themeSet.add(themeData.theme);
        this._currentTheme$.next(themeData);
    }

    get currentTheme$() {
        return this._currentTheme$.asObservable();
    }
}
