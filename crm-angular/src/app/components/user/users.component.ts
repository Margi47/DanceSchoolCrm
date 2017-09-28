import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions'
import { RouterActions } from '../../actions/router.actions'

@Component({
    selector: 'users',
    template: `
<users-list [users] = "users$ | async" 
            (add)="addUser()" 
            (details)="showDetails($event)"
            (loadUsers)="onPageChanged($event)">
</users-list>
`
})
export class UsersComponent implements OnInit {
    users$: Observable<any>;

    constructor(
        private routerActions: RouterActions,
        private store: Store<AppState>,
        private userActions: UserActions) {
        this.users$ = store.select('users');
    }

    ngOnInit() {
        this.store.dispatch(this.userActions.loadUsers(1, ""));
    };

    addUser() {
        this.store.dispatch(this.routerActions.show(['useradd']));
    }

    showDetails(id: number) {
        this.store.dispatch(this.routerActions.go(['userdetail', id]));
    }

    onPageChanged(data) {
        console.log(data.filter);
        this.store.dispatch(this.userActions.loadUsers(data.page, data.filter));
    }
}
