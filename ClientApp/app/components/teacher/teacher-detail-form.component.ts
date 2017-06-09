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
    @Output() showUser = new EventEmitter<number>();
    @Output() teacherDelete = new EventEmitter<Teacher>();
    @Output() addGroup = new EventEmitter<any>();
    @Output() removeGroup = new EventEmitter<any>();

    addingGroup: boolean = false;
    selectedGroup: Group;

    onGroupAdd(group: Group) {
        this.addGroup.emit({ teacher: this.model.id, group: group.id });
        this.addingGroup = false;
        this.selectedGroup = null;
    }
    onGroupRemove(groupId: number) {
        this.removeGroup.emit({ teacher: this.model.id, group: groupId });
    }
    showDetails(id: number) { this.showGroupDetails.emit(id); }
    showUserInfo() { this.showUser.emit(this.model.id); }
    deleteTeacher() { this.teacherDelete.emit(this.model); }

}