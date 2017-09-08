import { User } from './user';
import { Teacher } from './teacher';

export class Group {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    students: User[];
    teachers: Teacher[];
}