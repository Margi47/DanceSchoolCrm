import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';
import { RouterActions } from '../../actions/router.actions';

@Component({
    selector: 'groups',
    template: `
<group-list [groups]="groups$ | async" 
            (addNewGroup) = "addGroup()" 
            (groupDetails) = "showDetails($event)"
            (pageChanged)="onPageChanged($event)">
</group-list>`
})

export class GroupsComponent implements OnInit {
    groups$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private routerActions: RouterActions) {
        this.groups$ = store.select('groups');
    }

    ngOnInit() {
        this.store.dispatch(this.groupActions.loadGroups(1));
    }

    addGroup(): void {
        this.store.dispatch(this.routerActions.show(['/groupadd']));
    }

    showDetails(id: Number): void {
        this.store.dispatch(this.routerActions.go(['groupdetail', id]));
    }

    onPageChanged(page: number) {
        this.store.dispatch(this.groupActions.loadGroups(page));
    }
}
