import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';

@Component({
    selector: 'groups',
    template: `
<group-list [groups]="groups$ | async" 
            (addNewGroup) = "addGroup()" 
            (groupDetails) = "showDetails($event)">
</group-list>`
})

export class GroupsComponent implements OnInit {
    groups$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private router: Router) {
        this.groups$ = store.select('groups');
    }

    ngOnInit() {
        this.store.dispatch(this.groupActions.loadGroups());
    }

    addGroup(): void {
        this.router.navigate(['/groupadd']);
    }

    showDetails(id: Number): void {
        console.log(id);
        this.router.navigate(['groupdetail', id]);
    }
}