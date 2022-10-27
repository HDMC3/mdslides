import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { FormValidators } from 'src/app/shared/form-validators';

@Component({
    selector: 'app-new-slide-dialog',
    templateUrl: './new-slide-dialog.component.html',
    styleUrls: ['./new-slide-dialog.component.css']
})
export class NewSlideDialogComponent {

    nameControlStatus: NbComponentStatus;
    nameControl: FormControl;
    nameControlSubscription: Subscription;

    constructor(
        private nbDialogRef: NbDialogRef<any>
    ) {
        this.nameControlStatus = 'basic';
        this.nameControl = new FormControl('', [Validators.required, FormValidators.noEmpty]);

        this.nameControlSubscription = this.nameControl.statusChanges.subscribe(status => {
            this.nameControlStatus = status === 'INVALID' ? 'danger' : 'basic';
        });
    }

    closeDialog() {
        this.nbDialogRef.close();
    }

    save() {
        if (this.nameControl.invalid) {
            this.nameControl.markAsPristine();
            this.nameControlStatus = 'danger';
            return;
        };
        this.nbDialogRef.close({
            name: this.nameControl.value.trim()
        });
    }

}
