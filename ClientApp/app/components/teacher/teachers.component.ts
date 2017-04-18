import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { TeacherActions } from '../../actions/teacher.actions'

@Component({
    selector: 'teachers',
    template: `
<teachers-list [teachers] = "teachers$ | async" 
              (add)="addTeacher()" 
              (details)="showDetails($event)">
</teachers-list>
`
})
export class TeachersComponent implements OnInit {
    teachers$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private teacherActions: TeacherActions) {
        this.teachers$ = store.select('teachers');
    }

    ngOnInit() {
        this.store.dispatch(this.teacherActions.loadAllTeachers());
    };

    addTeacher() {
        this.router.navigate(['/teacheradd']);
    }

    showDetails(id: number) {
        this.router.navigate(['teacherdetail', id]);
    }
}