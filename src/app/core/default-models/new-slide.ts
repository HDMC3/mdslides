import { Slide } from 'src/app/data/interfaces/slide';
import { v4 } from 'uuid';

export const getNewSlide = (): Slide => {
    return {
        id: v4(),
        name: 'Nueva diapositiva',
        code: [
            '---',
            'style: |',
            '   section {',
            '       display: grid;',
            '       grid-template-columns: 1fr;',
            '       grid-template-rows: auto 1fr;',
            '       justify-items: center;',
            '   }',
            '   p {',
            '       justify-self: start',
            '   }',
            '---',
            '',
            '[comment]: # ( Encabezado )',
            '# Titulo de diapositiva',
            '',
            '[comment]: # ( Cuerpo )',
            'Texto para el cuerpo de la diapositiva'
        ]
    };
};
