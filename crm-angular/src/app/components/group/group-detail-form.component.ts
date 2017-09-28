import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { Teacher } from '../../models/teacher';
import { ErrorField } from '../../models/error-field';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'group-detail-form',
    templateUrl: './group-form.component.html'
})

export class GroupDetailFormComponent implements OnChanges {
    newGroup: boolean = false;

    @Input() errors: ErrorField[];
    @Input() model: Group;
    @Input() allUsers: any;
    @Input() allTeachers: any;

    @Output() deleteGroup = new EventEmitter<Group>();
    @Output() updateGroup = new EventEmitter<Group>();
    @Output() groupGoBack = new EventEmitter();

    @Output() loadStudents = new EventEmitter<any>();
    @Output() showUserDetails = new EventEmitter<number>();
    @Output() addGroupStudent = new EventEmitter<any>();
    @Output() removeGroupStudent = new EventEmitter<any>();

    @Output() loadTeachers = new EventEmitter<any>();
    @Output() showGroupTeacherDetails = new EventEmitter<number>();
    @Output() addGroupTeacher = new EventEmitter<any>();
    @Output() removeGroupTeacher = new EventEmitter<any>();

    addingStudent: boolean = false;
    isLastUserPage: boolean;

    addingTeacher: boolean = false;
    isLastTeacherPage: boolean;

    ngOnChanges() {
        this.isLastUserPage = this.allUsers.total != this.allUsers.length;
        this.isLastTeacherPage = this.allTeachers.total != this.allTeachers.length;
    }

    onGroupDelete() { this.deleteGroup.emit(this.model); }
    onGroupSubmit() { this.updateGroup.emit(this.model); }
    goBack() { this.groupGoBack.emit(); }

    loadNextUsers(data) {
        this.loadStudents.emit({ group: this.model.id, page: data.page, filter: data.filter });
    }

    showStudentDetails(id: number) { this.showUserDetails.emit(id); }
    addStudent(data) {
        this.addGroupStudent.emit({ groupId: this.model.id, userId: data.id });
        this.addingStudent = false;
    }
    removeStudent(id: number) {
        this.removeGroupStudent.emit({ groupId: this.model.id, studentId: id });
    }

    loadNextTeachers(data) {
        this.loadTeachers.emit({ group: this.model.id, page: data.page, filter: data.filter });
    }

    showTeacherDetails(id: number) { this.showGroupTeacherDetails.emit(id); }
    onTeacherAdd(data) {
        this.addGroupTeacher.emit({ groupId: this.model.id, teacher: data.id });
        this.addingTeacher = false;
    }
    removeTeacher(id: number) {
        this.removeGroupTeacher.emit({ groupId: this.model.id, teacherId: id });
    }
}
