import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router'

@Component({
    selector: 'users-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    users : User[];
    selectedUser: User
    errorMessage: string;

    constructor(private router: Router, private userService: UserService) {
        this.getList();
    }

    ngOnInit(): void {
        
    };

    getList(): void {
        this.userService.getUsers()
            .subscribe(
            u => this.users = u,
            error => this.errorMessage = <any>error);
    }

    addUser(): void {
        this.router.navigate(['/userForm']);
    }

    showDetails(id: Number): void {
        this.router.navigate(['userdetail', id]);
    }
}