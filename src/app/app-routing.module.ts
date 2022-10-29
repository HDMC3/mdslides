import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { PresentationViewComponent } from './components/presentation-view/presentation-view.component';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent
    },
    {
        path: 'presentation',
        component: PresentationViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
