import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'users',
    template: `
<users-list [users] = "users$ | async" 
            (add)="addUser()" 
            (details)="showDetails($event)">
</users-list>
`
})
export class UsersComponent implements OnInit {
    users$: Observable<User[]>;

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        console.log("getting list");
    };

    addUser(): void {
        this.router.navigate(['/useradd']);
    }

    showDetails(id: number): void {
        this.router.navigate(['userdetail', id]);
    }
}