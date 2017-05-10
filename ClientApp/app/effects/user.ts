import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { UserActions } from '../actions/user.actions';
import { ErrorActions } from '../actions/error.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private update$: Actions,
        private userActions: UserActions,
        private errorActions: ErrorActions,
        private service: UserService
    ) { }

    @Effect() loadUsers$ = this.update$
        .ofType(UserActions.LOAD_USERS)
        .switchMap(() => this.service.getUsers()
            .map(users => this.userActions.loadUsersSuccess(users))
            .catch(error => {
                console.log(error);
                return Observable.of(this.errorActions.catchError(error));
            })
        );

    @Effect() getUser$ = this.update$
        .ofType(UserActions.GET_USER)
        .map(action => action.payload)
        .switchMap(id => this.service.getUser(id)
            .map(user => this.userActions.getUserSuccess(user))
            .catch(error => {
                console.log(error);
                return Observable.of(this.errorActions.catchError(error));
            })
        );

    @Effect() addUser$ = this.update$
        .ofType(UserActions.ADD_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.addUser(user)
            .map(() => this.userActions.loadUsers())
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() deleteUser$ = this.update$
        .ofType(UserActions.DELETE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.deleteUser(user)
            .map(() => this.userActions.loadUsers())
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() saveUser$ = this.update$
        .ofType(UserActions.SAVE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.update(user)
            .map(() => this.userActions.loadUsers())
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() loadUserGroups$ = this.update$
        .ofType(UserActions.LOAD_USER_GROUPS)
        .map(action => action.payload)
        .switchMap(user => this.service.getUserGroups(user)
            .map(groups => this.userActions.loadUserGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() addUserGroup$ = this.update$
        .ofType(UserActions.ADD_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroup(obj.user, obj.group)
            .map(user => this.userActions.loadUserGroups(user))
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() removeUserGroup$ = this.update$
        .ofType(UserActions.REMOVE_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeGroup(obj.user, obj.group)
            .map(user => this.userActions.loadUserGroups(user))
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() createTeacher = this.update$
        .ofType(UserActions.CREATE_TEACHER)
        .map(action => action.payload)
        .switchMap(user => this.service.createTeacher(user)
            .map(user => this.userActions.getUser(user))
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );

    @Effect() deleteTeacher$ = this.update$
        .ofType(UserActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.deleteTeacher(id)
            .map(user => this.userActions.getUser(user))
            .catch(error => Observable.of(this.errorActions.catchError(error)))
        );
}