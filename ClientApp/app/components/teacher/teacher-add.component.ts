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
<teacher-add-form 
        [allUsers]="users$ | async"
        [allGroups]="groups$ | async"
        (teacherSave)="onTeacherSubmit($event)" 
        (teacherCancel)="onTeacherCancel()">
</teacher-add-form>`
})
export class TeacherAddComponent implements OnInit {
    users$: Observable<any>;
    groups$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private teacherActions: TeacherActions) {
        this.users$ = this.store.select('users');
        this.groups$ = this.store.select('groups');
    }

    ngOnInit() {
        this.store.dispatch(this.userActions.loadUsers());
        this.store.dispatch(this.groupActions.loadGroups());
    }

    onTeacherSubmit(teacher: Teacher): void {
        console.log(teacher.name);
        this.store.dispatch(this.teacherActions.addTeacher(teacher));
        this.router.navigate(['/teachers'])
    }

    onTeacherCancel(): void {
        this.router.navigate(['/teachers']);
    }
}