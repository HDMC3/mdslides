import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { EditTitleDialogComponent } from '../edit-title-dialog/edit-title-dialog.component';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    currentTheme: string;
    themeButtonIcon: string;
    presentation: Presentation;

    constructor(
        private nbThemeService: NbThemeService,
        private nbSidebarService: NbSidebarService,
        private activatedRoute: ActivatedRoute,
        private nbDialogService: NbDialogService
    ) {
        this.currentTheme = localStorage.getItem('nbTheme') ?? 'default';
        this.themeButtonIcon = this.currentTheme === 'default' ? 'moon-outline' : 'sun-outline';
        this.nbThemeService.changeTheme(this.currentTheme);

        this.presentation = {
            id: '',
            title: 'Mi titulo',
            description: '',
            slides: [],
            creation_date: new Date(),
            modification_date: new Date()
        };
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(take(1)).subscribe(params => {
            this.presentation.id = params['id'];
        });
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

    openEditTitleDialog() {
        this.nbDialogService.open(EditTitleDialogComponent, {
            closeOnBackdropClick: true,
            context: {
                presentation: this.presentation
            }
        });
    }

}
