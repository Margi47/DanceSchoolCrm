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
        this.service.addUser(this.model).subscribe(u => console.log(u));
        this.location.back();
    }

    onCancel(): void {       
        this.location.back();
    }
}