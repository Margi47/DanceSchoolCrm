import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'users-list',
    templateUrl: './users.component.html'
})

export class UsersComponent {
    users : User[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().then((u)=>this.users = u)
    }

    showDetails(user: User) {}
}