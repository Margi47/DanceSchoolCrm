import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AppState } from '../reducers';
import { GroupActions } from '../actions/group.actions';
import { UserActions } from '../actions/user.actions';
import { TeacherActions } from '../actions/teacher.actions';
import { ErrorActions } from '../actions/error.actions';
import { GroupService } from '../services/group.service';

@Injectable()
export class GroupEffects {
    constructor(
        private update$: Actions,
        private groupActions: GroupActions,
        private userActions: UserActions,
        private teacherActions: TeacherActions,
        private errorActions: ErrorActions,
        private service: GroupService,
        private router: Router
    ) { }

    @Effect() loadGroups$ = this.update$
        .ofType(GroupActions.LOAD_GROUPS)
        .switchMap(() => this.service.getGroups()
            .map(groups => this.groupActions.loadGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getGroup$ = this.update$
        .ofType(GroupActions.GET_GROUP)
        .map(action => action.payload)
        .switchMap(id => this.service.getGroup(id)
            .map(group => this.groupActions.getGroupSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getAvailableUserGroup$ = this.update$
        .ofType(GroupActions.LOAD_AVAILABLE_USER_GROUPS)
        .map(action => action.payload)
        .switchMap(id => this.service.getAvailableUserGroups(id)
            .map(groups => this.groupActions.loadAvailableUserGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getAvailableTeacherGroup$ = this.update$
        .ofType(GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(id => this.service.getAvailableTeacherGroups(id)
            .map(groups => this.groupActions.loadAvailableTeacherGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() saveGroup$ = this.update$
        .ofType(GroupActions.SAVE_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.update(group)
            .map(() => this.groupActions.loadGroups())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addGroup$ = this.update$
        .ofType(GroupActions.ADD_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.addGroup(group)
            .map(group => this.router.navigate(['groupdetail', group]))
            .catch(error => {
                let body = JSON.parse(error._body);
                return body.result ?
                    Observable.of(this.errorActions.catchValidationError(error.status, body)) :
                    Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body)));
            })
        );

    @Effect() getMainMessage = this.update$
        .ofType(ErrorActions.CATCH_VALIDATION_ERROR)
        .map(action => this.errorActions.catchError(action.payload.code, action.payload.error));

    @Effect() deleteGroup$ = this.update$
        .ofType(GroupActions.DELETE_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.deleteGroup(group)
            .map(() => this.groupActions.loadGroups())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() loadTeachers$ = this.update$
        .ofType(GroupActions.LOAD_TEACHERS)
        .map(action => action.payload)
        .switchMap(group => this.service.getTeachers(group)
            .map(teachers => this.groupActions.loadTeachesSuccess(teachers))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addGroupTeacher$ = this.update$
        .ofType(GroupActions.ADD_TEACHER)
        .map(action => action.payload)
        .switchMap(obj => this.service.addTeacher(obj.group, obj.teacher)
            .map(group => this.groupActions.changeGroupTeachersSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeTeacher = this.update$
        .ofType(GroupActions.REMOVE_TEACHER)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeTeacher(obj.group, obj.teacher)
            .map(group => this.groupActions.changeGroupTeachersSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() changeGroupTeachers = this.update$
        .ofType(GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
        .map(action => this.groupActions.loadTeaches(action.payload));

    @Effect() changeAvailableGroupTeachers = this.update$
        .ofType(GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
        .map(action => this.teacherActions.loadAvailableTeachers(action.payload));

    @Effect() loadStudents$ = this.update$
        .ofType(GroupActions.LOAD_STUDENTS)
        .map(action => action.payload)
        .switchMap(group => this.service.getStudents(group)
            .map(users => this.groupActions.loadStudentsSuccess(users))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addGroupStudent$ = this.update$
        .ofType(GroupActions.ADD_STUDENT)
        .map(action => action.payload)
        .switchMap(obj => this.service.addStudent(obj.group, obj.user)
            .map(group => this.groupActions.changeGroupStudentsSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeStudent = this.update$
        .ofType(GroupActions.REMOVE_STUDENT)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeStudent(obj.group, obj.user)
            .map(group => this.groupActions.changeGroupStudentsSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() changeGroupStudents = this.update$
        .ofType(GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
        .map(action => this.groupActions.loadStudents(action.payload));

    @Effect() changeAvailableGroupStudents = this.update$
        .ofType(GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
        .map(action => this.userActions.loadAvailableStudents(action.payload));

    @Effect() removeError = this.update$
        .ofType(GroupActions.LOAD_GROUPS_SUCCESS, GroupActions.GET_GROUP_SUCCESS, GroupActions.LOAD_STUDENTS_SUCCESS,
        GroupActions.LOAD_TEACHERS_SUCCESS, GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS,
        GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS, GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS,
        GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
        .map(users => this.errorActions.removeError());
}