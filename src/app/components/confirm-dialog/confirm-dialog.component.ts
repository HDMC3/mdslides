import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

    @Input() message: string = 'Desea continuar?';
    @Input() confirmButtonText: string = 'Si';

    constructor(private nbDialogRef: NbDialogRef<any>) {
    }

    close(confirm: boolean) {
        this.nbDialogRef.close({ confirm });
    }

}
