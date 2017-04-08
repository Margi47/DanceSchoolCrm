import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions'

@Component({
    selector: 'users',
    template: `
<users-list [users] = "users$ | async" 
            (add)="addUser()" 
            (details)="showDetails($event)">
</users-list>
`
})
export class UsersComponent implements OnInit {
    users$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private userActions: UserActions) {
        this.users$ = store.select('users');
    }

    ngOnInit() {
        this.store.dispatch(this.userActions.loadUsers());
        console.log("getting list");
    };

    addUser() {
        this.router.navigate(['/useradd']);
    }

    showDetails(id: number) {
        this.router.navigate(['userdetail', id]);
    }
}