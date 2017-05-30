import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'group-detail-form',
    templateUrl: './group-form.component.html'
})

export class GroupDetailFormComponent{
    newGroup: boolean = false;

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
    addStudent(student: User) {
        console.log(student);
        this.addGroupStudent.emit({ groupId: this.model.id, userId: student.id });
        this.addingStudent = false;
        this.selectedUser = null;
    }
    removeStudent(id: number) {
        console.log(id + "from form");
        this.removeGroupStudent.emit({ groupId: this.model.id, studentId: id });
    }

    showTeacherDetails(id: number) { this.showGroupTeacherDetails.emit(id); }
    onTeacherAdd(teacher: Teacher) {
        console.log(teacher);
        this.addGroupTeacher.emit({ groupId: this.model.id, teachers: [teacher.id] });
        this.addingTeacher = false;
        this.selectedTeacher = null;
    }
    removeTeacher(id: number) {
        console.log(id + "from form");
        this.removeGroupTeacher.emit({ groupId: this.model.id, teacherId: id });
    }
}