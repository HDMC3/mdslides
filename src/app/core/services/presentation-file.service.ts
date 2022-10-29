import { Injectable } from '@angular/core';
import { Presentation } from 'src/app/data/interfaces/presentation';

@Injectable({
    providedIn: 'root'
})
export class PresentationFileService {

    constructor() { }

    async downloadPresentation() {
        const themePresentationStr = localStorage.getItem('marp-theme');
        const presentationStr = localStorage.getItem('presentation');

        if (!themePresentationStr || !presentationStr) throw new Error('Problema al descargar presentacion');

        const themePresentation = JSON.parse(themePresentationStr);
        const presentation: Presentation = JSON.parse(presentationStr);

        const presentationFile = {
            theme: themePresentation,
            presentation
        };

        const file = new File([JSON.stringify(presentationFile, null, 2)], `${presentation.title.toLowerCase().replace(/\s/g, '-')}.json`, { type: 'application/json' });

        const base64: string | ArrayBuffer | null = await this.convertToBase64(file);

        const a = document.createElement('a');
        if (!a || !base64) throw new Error('Problema al descargar presentacion');
        a.href = base64.toString();
        a.download = `${presentation.title.toLowerCase().replace(/\s/g, '-')}.json`;
        a.click();
        a.remove();
    }

    convertToBase64(file: File) {
        return new Promise((resolve: (value: string | ArrayBuffer | null) => void, reject) => {
            const reader = new FileReader();
            reader.onerror = () => {
                reject(new Error('Problema al descargar presentacion'));
            };
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }
}
