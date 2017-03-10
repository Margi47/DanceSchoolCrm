import { Injectable } from '@angular/core';

import { User } from './user';
import { USERS } from './mock-users';

@Injectable()
export class UserService {
    getUsers(): Promise<User[]> {
        return Promise.resolve(USERS);
    }

    getUser(id: number): Promise<User> {
        return this.getUsers()
            .then(users => users.find(user => user.id === id));
    }

    addUser(user: User): void {
        USERS.push(user);
    }

    deleteUser(user: User): void {
        USERS.splice(USERS.indexOf(user), 1);
    }
}