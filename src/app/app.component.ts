import { Component } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentTheme: string;
    themeButtonIcon: string;

    constructor(
        private nbThemeService: NbThemeService,
        private nbSidebarService: NbSidebarService
    ) {
        this.currentTheme = localStorage.getItem('nbTheme') ?? 'default';
        this.themeButtonIcon = this.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';
        this.nbThemeService.changeTheme(this.currentTheme);
    }

    changeTheme() {
        const newTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        localStorage.setItem('nbTheme', newTheme);
        this.currentTheme = newTheme;
        this.nbThemeService.changeTheme(newTheme);
        this.themeButtonIcon = newTheme === 'default' ? 'moon-outline' : 'sun-outline';
    }

    toggleSidebar() {
        this.nbSidebarService.toggle();
    }
}
