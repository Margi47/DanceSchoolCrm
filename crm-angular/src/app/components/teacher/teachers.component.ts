import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { TeacherActions } from '../../actions/teacher.actions'
import { RouterActions } from '../../actions/router.actions'

@Component({
    selector: 'teachers',
    template: `
<teachers-list [teachers] = "teachers$ | async" 
              (add)="addTeacher()" 
              (teacherDetails)="showTeacherDetails($event)"
              (pageChanged)="onPageChanged($event)">
</teachers-list>
`
})
export class TeachersComponent implements OnInit {
    teachers$: Observable<any>;

    constructor(
        private routerActions: RouterActions,
        private store: Store<AppState>,
        private teacherActions: TeacherActions) {
        this.teachers$ = store.select('teachers');
    }

    ngOnInit() {
        this.store.dispatch(this.teacherActions.loadAllTeachers(1));
    };

    addTeacher() {
        this.store.dispatch(this.routerActions.show(['/teacheradd']));
    }

    showTeacherDetails(id: number) {
        this.store.dispatch(this.routerActions.go(['teacherdetail', id]));
    }

    onPageChanged(page: number) {
        this.store.dispatch(this.teacherActions.loadAllTeachers(page));
    }
}
