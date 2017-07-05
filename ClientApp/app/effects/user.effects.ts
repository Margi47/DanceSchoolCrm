import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AppState } from '../reducers';
import { UserActions } from '../actions/user.actions';
import { ErrorActions } from '../actions/error.actions';
import { GroupActions } from '../actions/group.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private update$: Actions,
        private userActions: UserActions,
        private errorActions: ErrorActions,
        private groupActions: GroupActions,
        private service: UserService,
        private router: Router
    ) { }

    @Effect() loadUsers$ = this.update$
        .ofType(UserActions.LOAD_USERS)
        .switchMap(() => this.service.getUsers()
            .map(users => this.userActions.loadUsersSuccess(users))
            .catch(error => {
                console.log(error._body.json);
                return Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body)));
            })
        );

    @Effect() getUser$ = this.update$
        .ofType(UserActions.GET_USER)
        .map(action => action.payload)
        .switchMap(id => this.service.getUser(id)
            .map(user => this.userActions.getUserSuccess(user))
            .catch(error => {
                console.log(JSON.parse(error._body));
                return Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body)));
            })
        );

    @Effect() getAvailableStudents$ = this.update$
        .ofType(UserActions.LOAD_AVAILABLE_STUDENTS)
        .map(action => action.payload)
        .switchMap(id => this.service.getAvailableStudents(id))
        .map(students => this.userActions.loadAvailableStudentsSuccess(students));

    @Effect() getAvailableTeachers$ = this.update$
        .ofType(UserActions.LOAD_AVAILABLE_TEACHERS)
        .map(action => action.payload)
        .switchMap(() => this.service.getAvailableTeachers())
        .map(users => this.userActions.loadAvailableTeachersSuccess(users));

    @Effect() addUser$ = this.update$
        .ofType(UserActions.ADD_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.addUser(user)
            .map(user => this.router.navigate(['userdetail', user]))
            .catch(error => {
                let body = JSON.parse(error._body);
                console.log(body);
                return body.result ?
                    Observable.of(this.errorActions.catchValidationError(error.status, body)) :
                    Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body)));
            }
        ));

    @Effect() getMainMessage = this.update$
        .ofType(ErrorActions.CATCH_VALIDATION_ERROR)
        .map(action => this.errorActions.catchError(action.payload.code, action.payload.error));


    @Effect() deleteUser$ = this.update$
        .ofType(UserActions.DELETE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.deleteUser(user)
            .map(() => this.userActions.loadUsers())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() saveUser$ = this.update$
        .ofType(UserActions.SAVE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.update(user)
            .map(() => this.userActions.loadUsers())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() loadUserGroups$ = this.update$
        .ofType(UserActions.LOAD_USER_GROUPS)
        .map(action => action.payload)
        .switchMap(user => this.service.getUserGroups(user)
            .map(groups => this.userActions.loadUserGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addUserGroup$ = this.update$
        .ofType(UserActions.ADD_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroup(obj.user, obj.group)
            .map(user => this.userActions.changeUserGroupsSuccess(user))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeUserGroup$ = this.update$
        .ofType(UserActions.REMOVE_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeGroup(obj.user, obj.group)
            .map(user => this.userActions.changeUserGroupsSuccess(user))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() changeUserGroups = this.update$
        .ofType(UserActions.CHANGE_USER_GROUPS_SUCCESS)
        .map(action => this.userActions.loadUserGroups(action.payload));

    @Effect() changeUserPossibleGroups = this.update$
        .ofType(UserActions.CHANGE_USER_GROUPS_SUCCESS)
        .map(action => this.groupActions.loadAvailableUserGroups(action.payload));

    @Effect() createTeacher = this.update$
        .ofType(UserActions.CREATE_TEACHER)
        .map(action => action.payload)
        .switchMap(user => this.service.createTeacher(user)
            .map(user => this.userActions.getUser(user))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() deleteTeacher$ = this.update$
        .ofType(UserActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.deleteTeacher(id)
            .map(user => this.userActions.getUser(user))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeError = this.update$
        .ofType(UserActions.LOAD_USERS_SUCCESS, UserActions.GET_USER_SUCCESS, UserActions.LOAD_USER_GROUPS_SUCCESS,
        UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS, UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS,
        UserActions.CHANGE_USER_GROUPS_SUCCESS)
        .map(users => this.errorActions.removeError());
}