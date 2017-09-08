import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Group } from '../../models/group';

@Component({
    selector: 'teacher-detail-form',
    templateUrl: './teacher-detail-form.component.html'
})

export class TeacherDetailFormComponent implements OnChanges {
    @Input() model: Teacher;
    @Input() allGroups: any;
    @Output() showGroupDetails = new EventEmitter<number>();
    @Output() showUser = new EventEmitter<number>();
    @Output() teacherDelete = new EventEmitter<Teacher>();

    @Output() loadNextPage = new EventEmitter<any>();
    @Output() addGroup = new EventEmitter<any>();
    @Output() removeGroup = new EventEmitter<any>();

    addingGroup: boolean = false;
    isLastPage: boolean;

    ngOnChanges() {
        this.isLastPage = this.allGroups.total != this.allGroups.groups.length;
    }

    loadNextGroups(data) {
        this.loadNextPage.emit({ teacher: this.model.id, page: data.page, filter: data.filter });
    }

    groupSelected(data) {
        this.addGroup.emit({ teacher: this.model.id, group: data.id });
        this.addingGroup = false;
    }
    onGroupRemove(groupId: number) {
        this.removeGroup.emit({ teacher: this.model.id, group: groupId });
    }
    showDetails(id: number) { this.showGroupDetails.emit(id); }
    showUserInfo() { this.showUser.emit(this.model.id); }
    deleteTeacher() { this.teacherDelete.emit(this.model); }

}
