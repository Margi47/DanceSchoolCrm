import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { User } from '../../models/user';
import { Group } from '../../models/group';

@Component({
    selector: 'teacher-add-form',
    templateUrl: './teacher-add-form.component.html'
})
export class TeacherAddFormComponent {
    model = new Teacher();

    @Input() allUsers: User[];

    @Output() teacherSave = new EventEmitter<Teacher>();
    @Output() teacherCancel = new EventEmitter();

    selectedUser: User;

    onTeacherSave() {
        this.model.id = this.selectedUser.id;
        this.model.name = this.selectedUser.name;
        this.teacherSave.emit(this.model);
    }
    onTeacherCancel() { this.teacherCancel.emit(); }
}