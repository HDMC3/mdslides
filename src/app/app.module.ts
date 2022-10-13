import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbButtonModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbIconModule,
        NbButtonModule,
        NbSidebarModule.forRoot(),
        NbEvaIconsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
