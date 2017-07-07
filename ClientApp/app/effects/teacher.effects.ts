import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { TeacherActions } from '../actions/teacher.actions';
import { GroupActions } from '../actions/group.actions';
import { ErrorActions } from '../actions/error.actions';
import { TeacherService } from '../services/teacher.service';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';

@Injectable()
export class TeacherEffects {
    constructor(
        private update$: Actions,
        private teacherActions: TeacherActions,
        private groupActions: GroupActions,
        private service: TeacherService,
        private errorActions: ErrorActions,
        private router: Router
    ) { }

    @Effect() loadTeachersWithGroups$ = this.update$
        .ofType(TeacherActions.LOAD_ALL_TEACHERS)
        .switchMap(() => this.service.getTeachers()
            .map(teachers => this.teacherActions.loadAllTeachersSuccess(teachers))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getTeacher$ = this.update$
        .ofType(TeacherActions.GET_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.getTeacher(id)
            .map(teacher => this.teacherActions.getTeacherSuccess(teacher))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() loadAvailableTeachers$ = this.update$
        .ofType(TeacherActions.LOAD_AVAILABLE_TEACHERS)
        .map(action => action.payload)
        .switchMap(id => this.service.getAvailableTeachers(id)
            .map(teachers => this.teacherActions.loadAvailableTeachersSuccess(teachers))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.addTeacher(teacher)
            .map(teacherId => this.router.navigate(['teacherdetail', teacherId]))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() deleteTeacher$ = this.update$
        .ofType(TeacherActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.deleteTeacher(teacher)
            .map(() => this.teacherActions.loadAllTeachers())
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getTeacherGroups$ = this.update$
        .ofType(TeacherActions.GET_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(teacher => this.service.getTeacherGroups(teacher)
            .map(groups => this.teacherActions.getTeacherGroupsSuccess(groups))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() addTeacherGroup$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroup(obj.teacher, obj.group)
            .map(teacher => this.teacherActions.changeTeacherGroupsSuccess(teacher))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() removeTeacherGroup$ = this.update$
        .ofType(TeacherActions.REMOVE_TEACHER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.deleteGroup(obj.teacher, obj.group)
            .map(teacher => this.teacherActions.changeTeacherGroupsSuccess(teacher))
            .catch(error => Observable.of(this.errorActions.catchError(error.status, JSON.parse(error._body))))
        );

    @Effect() getChangedGroups$ = this.update$
        .ofType(TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
        .map(action => this.teacherActions.getTeacherGroups(action.payload));

    @Effect() updateAvailableGroups$ = this.update$
        .ofType(TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
        .map(action => this.groupActions.loadAvailableTeacherGroups(action.payload));

    @Effect() removeError = this.update$
        .ofType(TeacherActions.LOAD_ALL_TEACHERS_SUCCESS, TeacherActions.GET_TEACHER_SUCCESS,
        TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS, TeacherActions.GET_TEACHER_GROUPS_SUCCESS,
        TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
        .map(users => this.errorActions.removeError());
}