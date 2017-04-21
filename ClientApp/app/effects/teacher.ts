import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { TeacherActions } from '../actions/teacher.actions';
import { TeacherService } from '../services/teacher.service';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';

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
        .map(teacher => {
            console.log(teacher);
            return this.teacherActions.addTeacherSuccess(teacher);
        });

    @Effect() addGroupsToNewTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_SUCCESS)
        .map(action => {
            return { teacher: action.payload.id, groups: action.payload.groups.map(g=>g.id) };
        })
        .switchMap(teacher => {
            console.log(teacher);
            return Observable.of(this.teacherActions.addTeacherGroups(teacher.teacher, teacher.groups));
        });

    @Effect() addTeacherGroups$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroups(obj.teacher, obj.groups))
        .map(groups => this.teacherActions.addTeacherGroupsSuccess(groups));

    @Effect() removeTeacherGroup$ = this.update$
        .ofType(TeacherActions.REMOVE_TEACHER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.deleteGroup(obj.teacher, obj.group))
        .map(group => this.teacherActions.removeTeacherGroupsSuccess(group));

    @Effect() getTeacher$ = this.update$
        .ofType(TeacherActions.GET_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.getTeacher(id))
        .map(teacher => this.teacherActions.getTeacherSuccess(teacher));

    @Effect() deleteTeacher$ = this.update$
        .ofType(TeacherActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.deleteTeacher(teacher))
        .map(teacher => this.teacherActions.deleteTeacherSuccess(teacher));
}