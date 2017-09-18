import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'teachers-list',
    templateUrl: './teacher-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class TeacherListComponent{
    @Input() teachers: Teacher[];

    @Output() add = new EventEmitter();
    @Output() teacherDetails = new EventEmitter<number>();
    @Output() pageChanged = new EventEmitter<number>();

    currentPage: number = 1;

    addTeacher() { this.add.emit(); }
    showTeacherDetails(id: number) { this.teacherDetails.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }
}
