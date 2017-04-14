import { User } from './user';
import { Group } from './group';

export class Teacher {
    id: number;
    userInfo: User;
    groups: Group[];
    styles: string[];
}