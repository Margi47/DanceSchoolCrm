import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router'

@Component({
    selector: 'users-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent {
    users : User[];
    selectedUser : User

    constructor( private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().then((u)=>this.users = u)
    }

    addUser(): void {
        this.router.navigate(['/userForm']);
    }

    showDetails(id: Number): void {
        this.router.navigate(['detail', id]);
    }
}