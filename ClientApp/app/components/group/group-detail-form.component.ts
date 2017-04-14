import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { User } from '../../models/user';

@Component({
    selector: 'group-detail-form',
    templateUrl: './group-detail-form.component.html'
})

export class GroupDetailFormComponent{
    @Input() model: Group;
    @Input() allUsers: User[];

    @Output() deleteGroup = new EventEmitter<Group>();
    @Output() updateGroup = new EventEmitter<Group>();
    @Output() groupGoBack = new EventEmitter();

    @Output() showUserDetails = new EventEmitter<number>();
    @Output() addGroupStudent = new EventEmitter<any>();
    @Output() removeGroupStudent = new EventEmitter<any>();

    addingStudent: boolean = false;
    selectedUser: User;

    onGroupDelete() { this.deleteGroup.emit(this.model); }
    onGroupSubmit() { this.updateGroup.emit(this.model); }
    goBack() { this.groupGoBack.emit(); }

    showDetails(id: number) { this.showUserDetails.emit(id); }
    addStudent() {
        console.log(this.selectedUser.name);
        this.addGroupStudent.emit({ groupId: this.model.id, userId: this.selectedUser.id });
        this.addingStudent = false;
        this.selectedUser = null;
    }
    removeStudent(id: number) {
        console.log(id + "from form");
        this.removeGroupStudent.emit({ groupId: this.model.id, studentId: id });
    }
}