import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { User } from '../../models/user';
import { Group } from '../../models/group';

@Component({
    selector: 'teacher-add-form',
    templateUrl: './teacher-add-form.component.html'
})
export class TeacherAddFormComponent implements OnChanges {
    model = new Teacher();

    @Input() allUsers: any;

    @Output() loadUsers = new EventEmitter<any>();
    @Output() teacherSave = new EventEmitter<Teacher>();
    @Output() teacherCancel = new EventEmitter();

    isLastPage: boolean;
    selectedUser: User;

    ngOnChanges() {       
        this.isLastPage = this.allUsers.total != this.allUsers.users.length;
    }

    loadNextUsers(data) {
        this.loadUsers.emit({ page: data.page, filter: data.filter });
    }

    userSelected(data) {
        this.selectedUser = data;
    }

    onTeacherSave() {
        this.model.id = this.selectedUser.id;
        this.model.name = this.selectedUser.name;
        this.teacherSave.emit(this.model);
    }

    onTeacherCancel() { this.teacherCancel.emit(); }
}
