import { Injectable } from '@angular/core';

import { User } from './user';
import { USERS } from './mock-users';

@Injectable()
export class UserService {
    getUsers(): Promise<User[]> {
        return Promise.resolve(USERS);
    }

    addUser(id: number, name: string, phone: string, email: string, isActive: boolean, isAdmin: boolean, isTeacher: boolean): void {
        var user = new User();
        user.id = id;
        user.name = name;
        user.phone = phone;
        user.email = email;
        user.active = isActive;
        user.isAdmin = isAdmin;
        user.isTeacher = isTeacher;
        USERS.push(user);
    }
}