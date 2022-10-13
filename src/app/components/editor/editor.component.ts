import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { Presentation } from 'src/app/data/interfaces/presentation';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    currentTheme: string;
    themeButtonIcon: string;
    editTitle: boolean;
    presentation?: Presentation;

    constructor(
        private nbThemeService: NbThemeService,
        private nbSidebarService: NbSidebarService
    ) {
        this.currentTheme = localStorage.getItem('nbTheme') ?? 'default';
        this.themeButtonIcon = this.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';
        this.nbThemeService.changeTheme(this.currentTheme);

        this.editTitle = false;
    }

    ngOnInit(): void {
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
