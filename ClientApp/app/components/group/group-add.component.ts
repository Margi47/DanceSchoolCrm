import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../models/group';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';
import { TeacherActions } from '../../actions/teacher.actions';

@Component({
    selector: 'add-group',
    template: `
<group-add-form [allTeachers] = "allTeachers$ | async"
                (groupSave)="onGroupSubmit($event)" 
                (groupCancel)="onGroupCancel()">
</group-add-form>`
})
export class GroupAddComponent implements OnInit {
    allTeachers$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private teacherActions: TeacherActions,
        private router: Router) {
        this.allTeachers$ = this.store.select('teachers');
    }

    ngOnInit() {
        this.store.dispatch(this.teacherActions.loadAllTeachers());
    }

    onGroupSubmit(group: Group): void {
        this.store.dispatch(this.groupActions.addGroup(group));
        this.router.navigate(['/groups'])
    }

    onGroupCancel(): void {
        this.router.navigate(['/groups']);
    }
}