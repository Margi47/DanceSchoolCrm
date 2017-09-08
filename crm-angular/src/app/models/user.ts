import { Group } from './group';

export class User {
    id: number;
    name: string;
    phone: string;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    isTeacher: boolean;
    groups: Group[];
}