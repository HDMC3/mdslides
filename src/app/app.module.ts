import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbButtonModule, NbSidebarModule, NbInputModule, NbDialogModule, NbCardModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditorComponent } from './components/editor/editor.component';
import { EditTitleDialogComponent } from './components/edit-title-dialog/edit-title-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdEditorComponent } from './components/md-editor/md-editor.component';
import { MaxLengthPipe } from './shared/pipes/max-length.pipe';
import { CurrentSlideComponent } from './components/current-slide/current-slide.component';
import { MiniatureSlideComponent } from './components/miniature-slide/miniature-slide.component';
import { MiniaturesComponent } from './components/miniatures/miniatures.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarpitThemesDialogComponent } from './components/marpit-themes-dialog/marpit-themes-dialog.component';
import { NewSlideDialogComponent } from './components/new-slide-dialog/new-slide-dialog.component';
import { PresentationViewComponent } from './components/presentation-view/presentation-view.component';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        EditTitleDialogComponent,
        MdEditorComponent,
        MaxLengthPipe,
        CurrentSlideComponent,
        MiniatureSlideComponent,
        MiniaturesComponent,
        MarpitThemesDialogComponent,
        NewSlideDialogComponent,
        PresentationViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbDialogModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbToastrModule.forRoot(),
        NbEvaIconsModule,
        DragDropModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
