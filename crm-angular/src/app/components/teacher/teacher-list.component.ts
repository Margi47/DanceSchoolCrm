import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
    selector: 'teachers-list',
    templateUrl: './teacher-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class TeacherListComponent{
    @Input() teachers: Teacher[];

    @Output() add = new EventEmitter();
    @Output() teacherDetails = new EventEmitter<number>();
    @Output() loadTeachers = new EventEmitter<any>();

    currentPage: number = 1;
    currentFilter: string = "";
    search = new Subject<string>();

    constructor() {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.currentFilter = data;
                this.loadTeachers.emit({ page: this.currentPage, filter: data });
            });
    }

    addTeacher() { this.add.emit(); }
    showTeacherDetails(id: number) { this.teacherDetails.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.loadTeachers.emit({ page: page, filter: this.currentFilter });
    }
}
