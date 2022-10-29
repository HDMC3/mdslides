import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

    transform(value: string | undefined, maxLength: number = 100): string {
        if (!value) return '';
        if (value.length > maxLength) {
            let newValue = '';
            const words = value.split(/\s/);
            for (const word of words) {
                if (`${newValue} ${word}`.length > maxLength) {
                    newValue += '...';
                    break;
                };
                newValue += ` ${word}`;
            }
            return newValue;
        }
        return value;
    }

}
