import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentOrCustomStatus, NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { FormValidators } from 'src/app/shared/form-validators';
import { Presentation } from 'src/app/data/interfaces/presentation';
import { PresentationService } from 'src/app/core/services/presentation.service';

@Component({
    selector: 'app-edit-title-dialog',
    templateUrl: './edit-title-dialog.component.html',
    styleUrls: ['./edit-title-dialog.component.css']
})
export class EditTitleDialogComponent implements OnInit, OnDestroy {

    @Input() presentation!: Presentation;
    titleForm: FormGroup;
    titleControlStatus: NbComponentOrCustomStatus = 'basic';
    formStatusChanges: Subscription;

    constructor(
        private nbDialogRef: NbDialogRef<any>,
        private presentationService: PresentationService
    ) {
        this.titleForm = new FormGroup({
            title: new FormControl('', [Validators.required, FormValidators.noEmpty])
        });

        this.formStatusChanges = this.titleForm.statusChanges.subscribe(status => {
            this.titleControlStatus = status === 'INVALID' ? 'danger' : 'basic';
        });
    }

    ngOnInit(): void {
        this.titleForm.controls['title'].setValue(this.presentation.title);
    }

    ngOnDestroy(): void {
        this.formStatusChanges.unsubscribe();
    }

    save() {
        if (this.titleForm.invalid) {
            return;
        }

        this.presentation.title = this.titleForm.controls['title'].value.trim();
        this.presentationService.updateStorage(this.presentation);
        this.closeDialog();
    }

    closeDialog() {
        this.nbDialogRef.close();
    }

}
