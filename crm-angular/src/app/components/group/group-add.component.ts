import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../models/group';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

import { GroupActions } from '../../actions/group.actions';
import { ErrorActions } from '../../actions/error.actions';
import { RouterActions } from '../../actions/router.actions';

@Component({
    selector: 'add-group',
    template: `
<div  class="col-sm-6">
    <group-add-form [errors] = "errors$ | async"
                    (groupSave)="onGroupSubmit($event)" 
                    (groupCancel)="onGroupCancel()">
    </group-add-form>
</div>`
})
export class GroupAddComponent {
    errors$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private routerActions: RouterActions,
        private errorActions: ErrorActions) {
        this.errors$ = this.store.select('errorFields');}

    onGroupSubmit(group: Group): void {
        this.store.dispatch(this.groupActions.addGroup(group));
    }

    onGroupCancel(): void {
        this.store.dispatch(this.routerActions.back());
    }
}
