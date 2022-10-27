import { v4 } from 'uuid';
import { Presentation } from '../../data/interfaces/presentation';

export const getInitialPresentation = (id: string): Presentation => {
    return {
        id,
        title: 'Titulo de presentacion',
        creation_date: new Date(),
        modification_date: new Date(),
        description: '',
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
