import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../../models/teacher';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';
import { GroupActions } from '../../actions/group.actions';
import { TeacherActions } from '../../actions/teacher.actions';

@Component({
    selector: 'add-teacher',
    template: `
<div class="col-sm-6">
    <teacher-add-form 
            [allUsers]="users$ | async"
            (teacherSave)="onTeacherSubmit($event)" 
            (teacherCancel)="onTeacherCancel()">
    </teacher-add-form>
</div>
`
})
export class TeacherAddComponent implements OnInit {
    users$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private teacherActions: TeacherActions) {
        this.users$ = this.store.select('users');
    }

    ngOnInit() {
        this.store.dispatch(this.userActions.loadAvailableTeachers());
    }

    onTeacherSubmit(teacher: Teacher): void {
        console.log(teacher.name);
        this.store.dispatch(this.teacherActions.addTeacher(teacher));
    }

    onTeacherCancel(): void {
        this.router.navigate(['/teachers']);
    }
}