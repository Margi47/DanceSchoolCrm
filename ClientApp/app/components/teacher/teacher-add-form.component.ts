import { Component, Output, EventEmitter } from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'user-add-form',
    templateUrl: './teacher-add-form.component.html'
})
export class TeacherAddFormComponent {
    model = new Teacher();

    @Output() userSave = new EventEmitter<User>()
    @Output() userCancel = new EventEmitter()

    onUserSubmit() { this.userSave.emit(this.model); }
    onUserCancel() { this.userCancel.emit(); }
}