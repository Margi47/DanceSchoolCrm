import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AppState } from '../reducers';
import { UserActions } from '../actions/user.actions';
import { GroupActions } from '../actions/group.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
    constructor(
        private update$: Actions,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private service: UserService,
        private router: Router
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
        .switchMap(user => this.service.addUser(user))
        .map(user => this.router.navigate(['userdetail', user]));

    @Effect() deleteUser$ = this.update$
        .ofType(UserActions.DELETE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.deleteUser(user))
        .map(() => this.userActions.loadUsers());

    @Effect() saveUser$ = this.update$
        .ofType(UserActions.SAVE_USER)
        .map(action => action.payload)
        .switchMap(user => this.service.update(user))
        .map(() => this.userActions.loadUsers());

    @Effect() loadUserGroups$ = this.update$
        .ofType(UserActions.LOAD_USER_GROUPS)
        .map(action => action.payload)
        .switchMap(user => this.service.getUserGroups(user))
        .map(groups => this.userActions.loadUserGroupsSuccess(groups));

    @Effect() addUserGroup$ = this.update$
        .ofType(UserActions.ADD_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroup(obj.user, obj.group))
        .map(user => this.userActions.changeUserGroupsSuccess(user));

    @Effect() removeUserGroup$ = this.update$
        .ofType(UserActions.REMOVE_USER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeGroup(obj.user, obj.group))
        .map(user => this.userActions.changeUserGroupsSuccess(user));

    @Effect() changeUserGroups = this.update$
        .ofType(UserActions.CHANGE_USER_GROUPS_SUCCESS)
        .map(action => this.userActions.loadUserGroups(action.payload));

    @Effect() changeUserPossibleGroups = this.update$
        .ofType(UserActions.CHANGE_USER_GROUPS_SUCCESS)
        .map(action => this.groupActions.loadAvailableUserGroups(action.payload));

    @Effect() createTeacher = this.update$
        .ofType(UserActions.CREATE_TEACHER)
        .map(action => action.payload)
        .switchMap(user => this.service.createTeacher(user))
        .map(user => this.userActions.getUser(user));

    @Effect() deleteTeacher$ = this.update$
        .ofType(UserActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.deleteTeacher(id))
        .map(user => this.userActions.getUser(user));
}