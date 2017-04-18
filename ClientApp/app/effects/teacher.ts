﻿import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { TeacherActions } from '../actions/teacher.actions';
import { TeacherService } from '../services/teacher.service';

@Injectable()
export class TeacherEffects {
    constructor(
        private update$: Actions,
        private teacherActions: TeacherActions,
        private service: TeacherService,
    ) { }

    @Effect() loadTeachersWithGroups$ = this.update$
        .ofType(TeacherActions.LOAD_ALL_TEACHERS)
        .switchMap(() => this.service.getTeachersWithGroups())
        .map(teachers => this.teacherActions.loadAllTeachersSuccess(teachers));

    @Effect() addTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.addTeacher(teacher))
        .map(teacher => this.teacherActions.addTeacherSuccess(teacher));

    @Effect() addGroupsToNewTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_SUCCESS)
        .map(action => action.payload)
        .switchMap(teacher => Observable.of(this.teacherActions.addTeacherGroups(teacher)));

    @Effect() addTeacherGroups$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(teacher => this.service.addGroups(teacher))
        .map(teacher => this.teacherActions.addTeacherGroupsSuccess(teacher));

    @Effect() getTeacher$ = this.update$
        .ofType(TeacherActions.GET_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.getTeacher(id))
        .map(teacher => this.teacherActions.getTeacherSuccess(teacher));

    @Effect() getTeacherGroups$ = this.update$
        .ofType(TeacherActions.GET_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(id => this.service.getTeacherGroups(id))
        .map(groups => this.teacherActions.getTeacherGroupsSuccess(groups));




    @Effect() updateTeacher$ = this.update$
        .ofType(TeacherActions.UPDATE_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.update(teacher))
        .map(teacher => this.teacherActions.updateTeacherSuccess(teacher));

    @Effect() deleteTeacher$ = this.update$
        .ofType(TeacherActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.deleteTeacher(teacher))
        .map(teacher => this.teacherActions.deleteTeacherSuccess(teacher));
}