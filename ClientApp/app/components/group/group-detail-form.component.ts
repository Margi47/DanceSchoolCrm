import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
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
    @ViewChild('groupForm') public groupForm: NgForm;
    ngOnChanges() {
        if (this.errors.length > 0) {
            for (let i in this.errors) {
                let item = this.errors[i];
                let nameControl = this.groupForm.form.get(item.key.toLowerCase());
                nameControl.markAsDirty();
                nameControl.setErrors({ "server": item.reasons });
            }
        }
    }

    newGroup: boolean = false;

    @Input() errors: ErrorField[];
    @Input() model: Group;
    @Input() allUsers: User[];
    @Input() allTeachers: Teacher[];

    @Output() deleteGroup = new EventEmitter<Group>();
    @Output() updateGroup = new EventEmitter<Group>();
    @Output() groupGoBack = new EventEmitter();

    @Output() showUserDetails = new EventEmitter<number>();
    @Output() addGroupStudent = new EventEmitter<any>();
    @Output() removeGroupStudent = new EventEmitter<any>();

    @Output() showGroupTeacherDetails = new EventEmitter<number>();
    @Output() addGroupTeacher = new EventEmitter<any>();
    @Output() removeGroupTeacher = new EventEmitter<any>();

    addingStudent: boolean = false;
    selectedUser: User;

    addingTeacher: boolean = false;
    selectedTeacher: Teacher;

    onGroupDelete() { this.deleteGroup.emit(this.model); }
    onGroupSubmit() { this.updateGroup.emit(this.model); }
    goBack() { this.groupGoBack.emit(); }

    showStudentDetails(id: number) { this.showUserDetails.emit(id); }
    addStudent() {
        this.addGroupStudent.emit({ groupId: this.model.id, userId: this.selectedUser.id });
        this.addingStudent = false;
        this.selectedUser = null;
    }
    removeStudent(id: number) {
        console.log(id + "from form");
        this.removeGroupStudent.emit({ groupId: this.model.id, studentId: id });
    }

    showTeacherDetails(id: number) { this.showGroupTeacherDetails.emit(id); }
    onTeacherAdd() {
        this.addGroupTeacher.emit({ groupId: this.model.id, teacher: this.selectedTeacher.id });
        this.addingTeacher = false;
        this.selectedTeacher = null;
    }
    removeTeacher(id: number) {
        console.log(id + "from form");
        this.removeGroupTeacher.emit({ groupId: this.model.id, teacherId: id });
    }
}