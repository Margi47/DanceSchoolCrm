import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Group } from '../../models/group';

@Component({
    selector: 'teacher-detail-form',
    templateUrl: './teacher-detail-form.component.html'
})

export class TeacherDetailFormComponent {
    @Input() model: Teacher;
    @Input() allGroups: Group[];
    @Output() teacherSubmit = new EventEmitter<Teacher>();
    @Output() teacherDelete = new EventEmitter<Teacher>();

    addingGroup: boolean = false;
    selectedGroup: Group;

    onTeacherSubmit() { this.teacherSubmit.emit(this.model); }
    onTeacherDelete() { this.teacherDelete.emit(this.model); }
    /*addGroup() {
        this.addingGroup = false;
        this.addUserGroup.emit({ userId: this.model.id, groupId: this.selectedGroup.id });
        this.selectedGroup = null;
    }*/
}