import { Component } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';
import { Location } from '@angular/common';

@Component({
    selector: 'add-form',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent {
    model = new User();

    constructor(private service: UserService, private location: Location) { }

    onSubmit(): void {
        console.log(this.model);
        this.service.addUser(this.model).subscribe();
        this.location.back();
    }

    onCancel(): void {       
        this.location.back();
    }
}