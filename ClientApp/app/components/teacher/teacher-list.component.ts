import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'teachers-list',
    templateUrl: './teacher-list.component.html'
})

export class TeacherListComponent implements OnChanges {
    @Input() teachers: Teacher[];
    @Output() add = new EventEmitter();
    @Output() teacherDetails = new EventEmitter<number>();
    @Output() userDetails = new EventEmitter<number>();

    addTeacher() { this.add.emit(); }
    showTeacherDetails(id: number) { this.teacherDetails.emit(id); }
    showUserDetails(id: number) { this.userDetails.emit(id); }

    ngOnChanges() {
        console.log(this.teachers);
    }
}