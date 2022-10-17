import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private _currentTheme: string;

    constructor(private nbThemeService: NbThemeService) {
        this._currentTheme = localStorage.getItem('nbTheme') ?? 'default';
        this.nbThemeService.changeTheme(this._currentTheme);
    }

    changeTheme() {
        const newTheme = this._currentTheme === 'default' ? 'dark' : 'default';
        localStorage.setItem('nbTheme', newTheme);
        this._currentTheme = newTheme;
        this.nbThemeService.changeTheme(newTheme);
    }

    get currentTheme() {
        return this._currentTheme;
    }
}
