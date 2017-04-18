import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'teachers-list',
    templateUrl: './teacher-list.component.html'
})

export class TeacherListComponent{
    @Input() teachers: Teacher[];
    @Output() add = new EventEmitter();
    @Output() details = new EventEmitter<number>();

    addTeacher() { this.add.emit(); }
    showDetails(id: number) { this.details.emit(id); }
}