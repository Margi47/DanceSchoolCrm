import { Component, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'add-form',
    templateUrl: './user-add-form.component.html'
})
export class UserAddFormComponent {
    model = new User();

    @Output() save = new EventEmitter<User>()
    @Output() cancel = new EventEmitter()

    onSubmit() { this.save.emit(this.model); }
    onCancel() { this.cancel.emit(); }
}