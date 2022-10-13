import { FormControl } from '@angular/forms';

export class FormValidators {
    static noEmpty(control: FormControl) {
        if (control.value == null) return { empty: true };

        const value: string = control.value;
        if (value.replace(/\s/g, '').length === 0) return { empty: true };

        return null;
    }
}
