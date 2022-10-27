import { Slide } from 'src/app/data/interfaces/slide';
import { v4 } from 'uuid';

export const getNewSlide = (nameSlide?: string): Slide => {
    return {
        id: v4(),
        name: nameSlide || 'Nueva diapositiva',
        code: [
            '---',
            'style: |',
            '   section {',
            '       display: grid;',
            '       place-content: center;',
            '   }',
            '---',
            '',
            '# Nueva diapositiva'
        ]
    };
};
