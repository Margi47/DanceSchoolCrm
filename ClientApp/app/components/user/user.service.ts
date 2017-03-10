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

    deleteUser(id: number): void {
        this.getUser(id).then(user=>  USERS.splice(USERS.indexOf(user), 1));
    }

    update(userData: User) {
        this.getUser(userData.id).then(user => this.deleteUser(user.id));
        USERS.push(userData);
    }
}