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
    @Output() showGroupDetails = new EventEmitter<number>();
    @Output() teacherSubmit = new EventEmitter<Teacher>();
    @Output() teacherDelete = new EventEmitter<Teacher>();

    addingGroup: boolean = false;
    selectedGroup: Group;

    onGroupAdd(group: Group) {
        this.model.groups.push(group);
        this.addingGroup = false;
    }
    showDetails(id: number) { this.showGroupDetails.emit(id); }
    onTeacherSubmit() { this.teacherSubmit.emit(this.model); }
    onTeacherDelete() { this.teacherDelete.emit(this.model); }
    /*addGroup() {
        this.addingGroup = false;
        this.addUserGroup.emit({ userId: this.model.id, groupId: this.selectedGroup.id });
        this.selectedGroup = null;
    }*/
}