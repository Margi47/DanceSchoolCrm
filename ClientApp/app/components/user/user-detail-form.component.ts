import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-detail-form.component.html'
})

export class UserDetailFormComponent {
    @Input() model: User;
    @Input() allGroups: Group[];
    @Output() userSubmit = new EventEmitter<User>();
    @Output() userDelete = new EventEmitter<User>();

    @Output() addUserGroup = new EventEmitter<any>();
    @Output() showGroupDetails = new EventEmitter<number>();
    @Output() removeUserGroup = new EventEmitter<any>();

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
}