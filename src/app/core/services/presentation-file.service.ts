import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { MarpitService } from './marpit.service';
import { PresentationService } from './presentation.service';

@Injectable({
    providedIn: 'root'
})
export class PresentationFileService {

    toastrConfig = {
        destroyByClick: true,
        icon: { icon: 'alert-circle-outline', options: { fill: '#fff' } },
        toastClass: 'error-toastr',
        limit: 3
    };

    constructor(
        private nbToastrService: NbToastrService,
        private marpitService: MarpitService,
        private presentationService: PresentationService
    ) { }

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

    async openPresentationFile() {
        try {
            const file = await this.selectFile();
            if (file.type !== 'application/json') throw new Error('Tipo de archivo invalido');

            const contentFile = await this.readJsonFile(file);
            if (!contentFile) throw new Error('Problema al cargar archivo');

            const presentationData = this.parseJSONContent(contentFile.toString());
            this.checkParsedObject(presentationData);
            this.marpitService.setMarpitTheme(presentationData.theme);
            this.presentationService.loadPresentation(presentationData.presentation);
        } catch (error: any) {
            this.nbToastrService.danger(error?.message, 'Ha ocurrido un problema', this.toastrConfig);
        }
    }

    private selectFile() {
        return new Promise((resolve: (file: File) => void, reject) => {
            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.onchange = (e: any) => {
                if (!e.target) {
                    reject(new Error('Problema al cargar archivo'));
                    return;
                }

                if (!e.target.files) {
                    reject(new Error('Problema al cargar archivo'));
                    return;
                }

                if (e.target.files.length > 1) {
                    reject(new Error('No puedes cargar mas de 1 presentacion'));
                    return;
                }

                const file = e.target.files[0];
                resolve(file);
            };
            inputFile.click();
        });
    }

    private convertToBase64(file: File) {
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

    private readJsonFile(file: File) {
        return new Promise((resolve: (jsonData: string | ArrayBuffer | null) => void, reject) => {
            const reader = new FileReader();
            reader.onerror = () => {
                reject(new Error('Problema al cargar presentacion'));
            };
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsText(file);
        });
    }

    private parseJSONContent(contentFile: string) {
        try {
            const presentationData = JSON.parse(contentFile);
            return presentationData;
        } catch (error: any) {
            throw new Error('El archivo no es valido');
        }
    }

    private checkParsedObject(parsedObj: any) {
        if (!parsedObj.theme || !parsedObj.presentation) throw new Error('La presentacion no es valida');

        if (typeof parsedObj.theme !== 'object' || typeof parsedObj.presentation !== 'object') throw new Error('La presentacion no es valida');

        const themeEntries = Object.entries(parsedObj.theme).sort();
        const correctThemeEntries = Object.entries({ name: '', theme: '', colors: [''] }).sort();
        if (themeEntries.length !== correctThemeEntries.length) throw new Error('La presentacion no es valida');

        for (let i = 0; i < correctThemeEntries.length; i++) {
            if (themeEntries[i][0] !== correctThemeEntries[i][0] ||
                typeof themeEntries[i][1] !== typeof correctThemeEntries[i][1]) throw new Error('La presentacion no es valida');
        }

        const presentationEntries = Object.entries(parsedObj.presentation).sort();
        const correctPresentationEntries = Object.entries({ id: '', title: '', slides: [], creation_date: '' }).sort();

        for (let i = 0; i < correctPresentationEntries.length; i++) {
            if (presentationEntries[i][0] !== correctPresentationEntries[i][0] ||
                typeof presentationEntries[i][1] !== typeof correctPresentationEntries[i][1]) throw new Error('La presentacion no es valida');
        }
    }
}
