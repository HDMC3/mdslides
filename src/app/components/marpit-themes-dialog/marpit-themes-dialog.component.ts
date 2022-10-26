import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MARP_DEFAULT_DARK_THEME } from 'src/app/core/marp-themes/default-dark';
import { MARP_DEFAULT_LIGHT_THEME } from 'src/app/core/marp-themes/default-light';
import { MARP_GAIA_THEME } from 'src/app/core/marp-themes/gaia-theme';
import { MARP_UNCOVER_THEME } from 'src/app/core/marp-themes/uncover-theme';
import { MarpitService } from 'src/app/core/services/marpit.service';
import { MarpThemeData } from 'src/app/core/types/marp-theme-data';

@Component({
    selector: 'app-marpit-themes-dialog',
    templateUrl: './marpit-themes-dialog.component.html',
    styleUrls: ['./marpit-themes-dialog.component.css']
})
export class MarpitThemesDialogComponent {

    @Input() currentTheme?: MarpThemeData;
    themes: MarpThemeData[];
    constructor(
        private marpitService: MarpitService,
        private nbDialogRef: NbDialogRef<any>
    ) {
        this.themes = [
            MARP_GAIA_THEME,
            MARP_UNCOVER_THEME,
            MARP_DEFAULT_DARK_THEME,
            MARP_DEFAULT_LIGHT_THEME
        ];
    }

    changeMarpTheme(theme: MarpThemeData) {
        this.marpitService.setMarpitTheme(theme);
        this.nbDialogRef.close();
    }

    getCSSGradient(colors: string[]) {
        const percentStep = 100 / colors.length;
        const gradientValue = colors.map((color, i) => {
            if (i === colors.length - 1) {
                return `${color} ${i * percentStep}% 100%`;
            }
            return `${color} ${i * percentStep}% ${i * percentStep + percentStep}%`;
        });
        const gradient = `linear-gradient(to right, ${gradientValue.join(',')})`;
        return gradient;
    }

}
