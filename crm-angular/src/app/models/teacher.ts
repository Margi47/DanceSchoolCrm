import { User } from './user';
import { Group } from './group';

export class Teacher {
    id: number;
    name: string;
    groups: Group[];
    styles: string[];
}