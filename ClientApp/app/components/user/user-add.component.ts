import { Component } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'add-user',
    template: `
<add-form (userSave)="onUserSubmit($event)" (userCancel)="onUserCancel()"></add-form>`
})
export class UserAddComponent {
    constructor(private router: Router, private service: UserService, private location: Location) { }

    onUserSubmit(user: User): void {
        console.log(user);
        this.service.addUser(user).subscribe();
        this.router.navigate(['/users'])
    }

    onUserCancel(): void {
        this.router.navigate(['/users']);
    }
}