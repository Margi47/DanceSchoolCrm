import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { ErrorField } from '../../models/error-field';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-form.component.html'
})

export class UserDetailFormComponent implements OnChanges {
    newUser: boolean = false;
    @Input() model: User;
    @Input() allGroups: any;
    @Input() errors: ErrorField[];
    @Output() userSubmit = new EventEmitter<User>();
    @Output() userDelete = new EventEmitter<User>();

    @Output() loadNextGroups = new EventEmitter<any>();
    @Output() addUserGroup = new EventEmitter<any>();
    @Output() showGroupDetails = new EventEmitter<number>();
    @Output() removeUserGroup = new EventEmitter<any>();

    @Output() goToTeacher = new EventEmitter<number>();
    @Output() isTeacherChanged = new EventEmitter <any>()

    addingGroup: boolean = false;
    isLastPage: boolean;

    ngOnChanges() {
        this.isLastPage = this.allGroups.total != this.allGroups.groups.length;
    }

    onUserSubmit() { this.userSubmit.emit(this.model); }
    onUserDelete() { this.userDelete.emit(this.model); }
    addGroup(data) {
        this.addingGroup = false;
        this.addUserGroup.emit({ userId: this.model.id, groupId: data.id });
    }

    loadData(data) {
        this.loadNextGroups.emit({ user: this.model.id, page: data.page, filter: data.filter });
    }
    showDetails(id: number) { this.showGroupDetails.emit(id); }
    removeGroup(id: number) { this.removeUserGroup.emit({ userId: this.model.id, groupId: id }); }

    onTeacherDetails() { this.goToTeacher.emit(this.model.id); }
    isTeacherClicked(value: boolean) {
        this.model.isTeacher = value;
        this.isTeacherChanged.emit({ user: this.model, value: value });
    }
    isActiveClicked(value: boolean) {
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
