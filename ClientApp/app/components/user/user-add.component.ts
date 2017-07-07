import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';;
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';
import { ErrorActions } from '../../actions/error.actions';

@Component({
    selector: 'add-user',
    template: `
<user-add-form 
        [errors] = "errors$ | async"
        (userSave)="onUserSubmit($event)" 
        (userCancel)="onUserCancel()">
</user-add-form>`
})
export class UserAddComponent {
    errors$: Observable<any>;

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private userActions: UserActions,
        private errorActions: ErrorActions) {
        this.errors$ = this.store.select('errorFields');
    }

    onUserSubmit(user: User): void {
        this.store.dispatch(this.userActions.addUser(user));
    }

    onUserCancel(): void {
        this.router.navigate(['/users']);
    }
}