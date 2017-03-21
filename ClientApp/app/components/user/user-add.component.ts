import { Component } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

@Component({
    selector: 'add-user',
    template: `
<add-form (save)="onSubmit($event)" (cancel)="onCancel()"></add-form>`
})
export class UserAddComponent {
    constructor(private service: UserService, private location: Location) { }

    onSubmit(user: User): void {
        console.log(user);
        this.service.addUser(user).subscribe();
        this.location.back();
    }

    onCancel(): void {
        this.location.back();
    }
}