import { v4 } from 'uuid';
import { Presentation } from '../../data/interfaces/presentation';

export const getInitialPresentation = (id?: string): Presentation => {
    return {
        id: id ?? v4(),
        title: 'Titulo de presentacion',
        creation_date: new Date(),
        slides: [
            {
                id: v4(),
                name: 'Inicio de presentación',
                code: [
                    '---',
                    'style: |',
                    '   section {',
                    '       display: flex;',
                    '       flex-direction: column;',
                    '       align-items: center;',
                    '       justify-content: center;',
                    '   }',
                    '---',
                    '',
                    '# Bienvenidos',
                    '# 😄✌'
                ]
            }
        ]
    };
};
