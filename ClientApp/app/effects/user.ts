import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { UserActions } from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private update$: Actions,
        private userActions: UserActions,
        private service: UserService,
    ) { }

    @Effect() loadUsers$ = this.update$
        .ofType(UserActions.LOAD_USERS)
        .switchMap(() => this.service.getUsers())
        .map(users => this.userActions.loadUsersSuccess(users));

    @Effect() getUser$ = this.update$
        .ofType(UserActions.GET_USER)
        .map(action => action.payload)
        .switchMap(id => this.service.getUser(id))
        .map(user => this.userActions.getUserSuccess(user));

    @Effect() saveUser$ = this.update$
        .ofType(UserActions.SAVE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.update(user))
        .map(user => this.userActions.saveUserSuccess(user));

    @Effect() addUser$ = this.update$
        .ofType(UserActions.ADD_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.addUser(user))
        .map(user => this.userActions.addUserSuccess(user));

    @Effect() addTeacherToNewUser = this.update$
        .ofType(UserActions.ADD_USER_SUCCESS)
        .map(action => action.payload)
        .switchMap(user => {
            if (user.isTeacher) {
                return Observable.of(this.userActions.createTeacher(user));
            }
        })

    @Effect() deleteUser$ = this.update$
        .ofType(UserActions.DELETE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.deleteUser(user))
        .map(user => this.userActions.deleteUserSuccess(user));

    @Effect() loadUserGroups$ = this.update$
        .ofType(UserActions.LOAD_USER_GROUPS)
        .map(action => action.payload)
        .switchMap(user => this.service.getUserGroups(user))
        .map(groups => this.userActions.loadUserGroupsSuccess(groups));

    @Effect() addUserGroup$ = this.update$
        .ofType(UserActions.ADD_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => {
            console.log(obj);
            return this.service.addGroup(obj.user, obj.group);
        })
        .map(group => this.userActions.addUserGroupSuccess(group));

    @Effect() removeUserGroup$ = this.update$
        .ofType(UserActions.REMOVE_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => {
            console.log(obj);
            return this.service.removeGroup(obj.user, obj.group);
        })
        .map(group => this.userActions.removeUserGroupSuccess(group));

    @Effect() createTeacher = this.update$
        .ofType(UserActions.CREATE_TEACHER)
        .map(action => action.payload)
        .switchMap(user => this.service.createTeacher(user))
        .map(teacher => this.userActions.createTeacherSuccess());

    @Effect() deleteTeacher$ = this.update$
        .ofType(UserActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.deleteTeacher(id))
        .map(id => this.userActions.deleteTeacherSuccess());
}