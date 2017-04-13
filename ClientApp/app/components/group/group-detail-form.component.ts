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
    @Output() addGroupUser = new EventEmitter<any>();

    addingUser: boolean = false;
    selectedUser: User;

    onGroupDelete() { this.deleteGroup.emit(this.model); }
    onGroupSubmit() { this.updateGroup.emit(this.model); }
    goBack() { this.groupGoBack.emit(); }
    showDetails(id: number) { this.showUserDetails.emit(id); }
    addUser() {
        console.log(this.selectedUser.name);
        this.addGroupUser.emit({ groupId: this.model.id, userId: this.selectedUser.id });
        this.addingUser = false;
        this.selectedUser = null;
    }
}