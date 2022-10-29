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

        this.currentTheme = this.getMarpThemeStorage();
        this._currentTheme$ = new BehaviorSubject(this.currentTheme);
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
        this.updateMarpThemeStorage(themeData);
    }

    private getMarpThemeStorage() {
        const marpThemeStorageStr = localStorage.getItem('marp-theme');
        if (!marpThemeStorageStr) {
            localStorage.setItem('marp-theme', JSON.stringify(MARP_GAIA_THEME));
            return MARP_GAIA_THEME;
        }

        const marpThemeStorage: MarpThemeData = JSON.parse(marpThemeStorageStr);
        return marpThemeStorage;
    }

    private updateMarpThemeStorage(marpTheme: MarpThemeData) {
        const marpThemeStr = JSON.stringify(marpTheme);
        localStorage.setItem('marp-theme', marpThemeStr);
    }

    get currentTheme$() {
        return this._currentTheme$.asObservable();
    }
}
