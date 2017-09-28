import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { ActionWithPayload } from '../actions/actionWithPayload';
import { AvailableGroups } from '../actions/actionWithPayload';
import { ErrorPayload } from '../actions/actionWithPayload';
import { GroupTeacher } from '../actions/actionWithPayload';
import { UserGroup } from '../actions/actionWithPayload';
import { ListRequest } from '../actions/actionWithPayload';

import { Group } from '../models/group';
import { AppState } from '../reducers';
import { GroupActions } from '../actions/group.actions';
import { UserActions } from '../actions/user.actions';
import { TeacherActions } from '../actions/teacher.actions';
import { ErrorActions } from '../actions/error.actions';
import { RouterActions } from '../actions/router.actions';
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
        private routerActions: RouterActions
    ) { }

    @Effect() loadGroups$ = this.update$
        .ofType(GroupActions.LOAD_GROUPS)
        .map((action: ActionWithPayload<ListRequest>) => action.payload)
        .switchMap(data => this.service.getGroups(data.page, data.filter)
            .map(groups => this.groupActions.loadGroupsSuccess(groups.data, groups.total))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getGroup$ = this.update$
        .ofType(GroupActions.GET_GROUP)
        .map((action: ActionWithPayload<number>) => action.payload)
        .switchMap(id => this.service.getGroup(id)
            .map(group => this.groupActions.getGroupSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getAvailableUserGroup$ = this.update$
        .ofType(GroupActions.LOAD_AVAILABLE_USER_GROUPS)
        .map((action: ActionWithPayload<AvailableGroups>) => action.payload)
        .switchMap(data => this.service.getAvailableUserGroups(data.userId, data.page, data.filter)
            .map(groups => this.groupActions.loadAvailableUserGroupsSuccess(groups.data, groups.total))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getAvailableTeacherGroup$ = this.update$
        .ofType(GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS)
        .map((action: ActionWithPayload<AvailableGroups>) => action.payload)
        .switchMap(data => this.service.getAvailableTeacherGroups(data.userId, data.page, data.filter)
            .map(groups => this.groupActions.loadAvailableTeacherGroupsSuccess(groups.data, groups.total))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() saveGroup$ = this.update$
        .ofType(GroupActions.SAVE_GROUP)
        .map((action: ActionWithPayload<Group>) => action.payload)
        .switchMap(group => this.service.update(group)
            .map(() => this.groupActions.changeGroupSuccess())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
    );

    @Effect() navigationAfterChange$ = this.update$
        .ofType(GroupActions.CHANGE_GROUP_SUCCESS)
        .map(() => this.routerActions.back());

    @Effect() changeUserSuccess$ = this.update$
        .ofType(GroupActions.CHANGE_GROUP_SUCCESS)
        .map(() => this.errorActions.removeError());

    @Effect() addGroup$ = this.update$
        .ofType(GroupActions.ADD_GROUP)
        .map((action: ActionWithPayload<Group>) => action.payload)
        .switchMap(group => this.service.addGroup(group)
            .map(group => this.groupActions.addGroupSuccess(group))
            .catch(error => {
                let body = JSON.parse(error._body);
                return body.result ?
                    Observable.of(this.errorActions.catchValidationError(error.status, body)) :
                    Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body)));
            })
        );

    @Effect() navigateToDetails = this.update$
        .ofType(GroupActions.ADD_GROUP_SUCCESS)
        .map((action: ActionWithPayload<number>) => this.routerActions.go(['groupdetail', action.payload]));

    @Effect() getMainMessage = this.update$
        .ofType(ErrorActions.CATCH_VALIDATION_ERROR)
        .map((action: ActionWithPayload<ErrorPayload>) =>
            this.errorActions.catchError(action.payload.code, action.payload.error));

    @Effect() deleteGroup$ = this.update$
        .ofType(GroupActions.DELETE_GROUP)
        .map((action: ActionWithPayload<number>) => action.payload)
        .switchMap(group => this.service.deleteGroup(group)
            .map(() => this.groupActions.changeGroupSuccess())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() loadTeachers$ = this.update$
        .ofType(GroupActions.LOAD_TEACHERS)
        .map((action: ActionWithPayload<number>) => action.payload)
        .switchMap(group => this.service.getTeachers(group)
            .map(teachers => this.groupActions.loadTeachesSuccess(teachers))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addGroupTeacher$ = this.update$
        .ofType(GroupActions.ADD_TEACHER)
        .map((action: ActionWithPayload<GroupTeacher>) => action.payload)
        .switchMap(obj => this.service.addTeacher(obj.groupId, obj.teacherId)
            .map(group => this.groupActions.changeGroupTeachersSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeTeacher = this.update$
        .ofType(GroupActions.REMOVE_TEACHER)
        .map((action: ActionWithPayload<GroupTeacher>) => action.payload)
        .switchMap(obj => this.service.removeTeacher(obj.groupId, obj.teacherId)
            .map(group => this.groupActions.changeGroupTeachersSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() changeGroupTeachers = this.update$
        .ofType(GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
        .map((action: ActionWithPayload<number>) => this.groupActions.loadTeaches(action.payload));

    @Effect() changeAvailableGroupTeachers = this.update$
        .ofType(GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
        .map((action: ActionWithPayload<number>) =>
            this.teacherActions.loadAvailableTeachers(action.payload, 1, ""));

    @Effect() loadStudents$ = this.update$
        .ofType(GroupActions.LOAD_STUDENTS)
        .map((action: ActionWithPayload<number>) => action.payload)
        .switchMap(group => this.service.getStudents(group)
            .map(users => this.groupActions.loadStudentsSuccess(users))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addGroupStudent$ = this.update$
        .ofType(GroupActions.ADD_STUDENT)
        .map((action: ActionWithPayload<UserGroup>) => action.payload)
        .switchMap(obj => this.service.addStudent(obj.groupId, obj.userId)
            .map(group => this.groupActions.changeGroupStudentsSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeStudent = this.update$
        .ofType(GroupActions.REMOVE_STUDENT)
        .map((action: ActionWithPayload<UserGroup>) => action.payload)
        .switchMap(obj => this.service.removeStudent(obj.groupId, obj.userId)
            .map(group => this.groupActions.changeGroupStudentsSuccess(group))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() changeGroupStudents = this.update$
        .ofType(GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
        .map((action: ActionWithPayload<number>) => this.groupActions.loadStudents(action.payload));

    @Effect() changeAvailableGroupStudents = this.update$
        .ofType(GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
        .map((action: ActionWithPayload<number>) => this.userActions.loadAvailableStudents(action.payload, 1, ""));

    @Effect() removeError = this.update$
        .ofType(GroupActions.LOAD_GROUPS_SUCCESS, GroupActions.GET_GROUP_SUCCESS, GroupActions.LOAD_STUDENTS_SUCCESS,
        GroupActions.LOAD_TEACHERS_SUCCESS, GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS,
        GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS, GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS,
        GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS, GroupActions.ADD_GROUP_SUCCESS)
        .map(users => this.errorActions.removeError());
}
