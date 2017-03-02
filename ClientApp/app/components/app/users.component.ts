import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router'

@Component({
    selector: 'users-list',
    templateUrl: './users.component.html'
})

export class UsersComponent {
    users : User[];

    constructor( private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().then((u)=>this.users = u)
    }

    showDetails(): void {
        this.router.navigate(['/detail']);
    }
}