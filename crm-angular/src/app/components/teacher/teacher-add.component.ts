import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../../models/teacher';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';
import { GroupActions } from '../../actions/group.actions';
import { TeacherActions } from '../../actions/teacher.actions';
import { RouterActions } from '../../actions/router.actions';

@Component({
    selector: 'add-teacher',
    template: `
<div class="col-sm-6">
    <teacher-add-form 
            [allUsers]="users$ | async"
            (loadUsers)="loadNextPage($event)"
            (teacherSave)="onTeacherSubmit($event)" 
            (teacherCancel)="onTeacherCancel()">
    </teacher-add-form>
</div>
`
})
export class TeacherAddComponent implements OnInit {
    users$: Observable<any>;

    constructor(
        private routerActions: RouterActions,
        private store: Store<AppState>,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private teacherActions: TeacherActions) {
        this.users$ = this.store.select('users');
    }

    ngOnInit() {
        this.store.dispatch(this.userActions.loadAvailableTeachers(1, ""));
    }

    loadNextPage($event) {
        this.store.dispatch(this.userActions.loadAvailableTeachers($event.page, $event.filter));
    }

    onTeacherSubmit(teacher: Teacher): void {
        this.store.dispatch(this.teacherActions.addTeacher(teacher));
    }

    onTeacherCancel(): void {
        this.store.dispatch(this.routerActions.go(['/teachers']));
    }
}
