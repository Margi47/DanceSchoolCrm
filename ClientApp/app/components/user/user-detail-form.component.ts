import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-form.component.html'
})

export class UserDetailFormComponent {
    newUser: boolean = false;
    @Input() model: User;
    @Input() allGroups: Group[];
    @Output() userSubmit = new EventEmitter<User>();
    @Output() userDelete = new EventEmitter<User>();

    @Output() addUserGroup = new EventEmitter<any>();
    @Output() showGroupDetails = new EventEmitter<number>();
    @Output() removeUserGroup = new EventEmitter<any>();

    @Output() goToTeacher = new EventEmitter<number>();
    @Output() isTeacherChanged = new EventEmitter <any>()

    addingGroup: boolean = false;
    selectedGroup: Group;

    onUserSubmit() { this.userSubmit.emit(this.model); }
    onUserDelete() { this.userDelete.emit(this.model); }
    addGroup() {
        this.addingGroup = false;
        this.addUserGroup.emit({ userId: this.model.id, groupId: this.selectedGroup.id });
        this.selectedGroup = null;
    }
    showDetails(id: number) { this.showGroupDetails.emit(id); }
    removeGroup(id: number) { this.removeUserGroup.emit({ userId: this.model.id, groupId: id }); }

    onTeacherDetails() { this.goToTeacher.emit(this.model.id); }
    isTeacherClicked(value: boolean) {
        console.log(value);
        this.model.isTeacher = value;
        this.isTeacherChanged.emit({ user: this.model, value: value });
    }
    isActiveClicked(value: boolean) {
        console.log(value);
        if (!value) {
            this.model.isActive = false;
            this.model.isAdmin = false;
            if (this.model.isTeacher) {
                this.isTeacherClicked(false);
            }
        } else {
            this.model.isActive = true;
        }
    }
}