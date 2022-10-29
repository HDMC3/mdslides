import { Slide } from './slide';

export interface Presentation {
    id: string;
    title: string;
    slides: Slide[];
    creation_date: Date;
}
