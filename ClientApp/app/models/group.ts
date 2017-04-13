import { User } from './user';

export class Group {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    students: User[];
}