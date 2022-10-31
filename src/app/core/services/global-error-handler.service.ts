import { Injectable, ErrorHandler } from '@angular/core';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ApplicationError } from '../application-error';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    toastrConfig: Partial<NbToastrConfig>;

    constructor(private nbToastrService: NbToastrService) {
        this.toastrConfig = {
            destroyByClick: true,
            icon: { icon: 'alert-circle-outline', options: { fill: '#fff' } },
            toastClass: 'error-toastr',
            limit: 3
        };
    }

    handleError(error: Error): void {
        if (error instanceof ApplicationError) {
            this.nbToastrService.danger(
                error.message || 'Intenta recargar la pagina',
                error.title || 'Ha ocurrido un problema',
                this.toastrConfig
            );
            return;
        }

        this.nbToastrService.danger(
            error.message || 'Intenta recargar la pagina',
            'Ha ocurrido un problema',
            this.toastrConfig
        );
    }
}
