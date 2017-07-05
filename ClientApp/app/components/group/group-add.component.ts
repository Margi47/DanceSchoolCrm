import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../models/group';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

import { GroupActions } from '../../actions/group.actions';
import { ErrorActions } from '../../actions/error.actions';

@Component({
    selector: 'add-group',
    template: `
<group-add-form [errors] = "errors$ | async"
                (groupSave)="onGroupSubmit($event)" 
                (groupCancel)="onGroupCancel()">
</group-add-form>`
})
export class GroupAddComponent {
    errors$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private router: Router,
        private errorActions: ErrorActions) {
        this.errors$ = this.store.select('errorFields');}

    onGroupSubmit(group: Group): void {
        this.store.dispatch(this.groupActions.addGroup(group));
    }

    onGroupCancel(): void {
        this.router.navigate(['/groups']);
        this.store.dispatch(this.errorActions.removeError());
    }
}