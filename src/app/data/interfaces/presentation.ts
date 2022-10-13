import { Slide } from './slide';

export interface Presentation {
    id: string;
    title: string;
    description: string;
    slides: Slide[];
    creation_date: Date;
    modification_date: Date;
}
