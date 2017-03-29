import { Component, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'user-add-form',
    templateUrl: './user-add-form.component.html'
})
export class UserAddFormComponent {
    model = new User();

    @Output() userSave = new EventEmitter<User>()
    @Output() userCancel = new EventEmitter()

    onUserSubmit() { this.userSave.emit(this.model); }
    onUserCancel() { this.userCancel.emit(); }
}