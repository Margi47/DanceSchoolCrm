import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'group-add-form',
    templateUrl: './group-form.component.html'
})
export class GroupAddFormComponent {
    model = new Group();
    newGroup: boolean = true;

    @Input() allTeachers: Teacher[];
    @Output() groupSave = new EventEmitter<Group>();
    @Output() groupCancel = new EventEmitter();

    selectedTeacher: Teacher;
    selectedTeachers: Teacher[] = [];

    onSubmit() { this.groupSave.emit(this.model); }
    onCancel() { this.groupCancel.emit(); }
    onTeacherAdd(teacher: Teacher) {
        console.log(teacher);
        this.selectedTeachers.push(teacher);
        this.model.teachers = this.selectedTeachers;
    }
}