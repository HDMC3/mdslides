import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbButtonModule, NbSidebarModule, NbInputModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditorComponent } from './components/editor/editor.component';
import { EditTitleDialogComponent } from './components/edit-title-dialog/edit-title-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdEditorComponent } from './components/md-editor/md-editor.component';
import { MaxLengthPipe } from './shared/pipes/max-length.pipe';
import { CurrentSlideComponent } from './components/current-slide/current-slide.component';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        EditTitleDialogComponent,
        MdEditorComponent,
        MaxLengthPipe,
        CurrentSlideComponent
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
        NbEvaIconsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
