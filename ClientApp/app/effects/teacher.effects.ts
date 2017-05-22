import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { TeacherActions } from '../actions/teacher.actions';
import { GroupActions } from '../actions/group.actions';
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
        private router: Router
    ) { }

    @Effect() loadTeachersWithGroups$ = this.update$
        .ofType(TeacherActions.LOAD_ALL_TEACHERS)
        .switchMap(() => this.service.getTeachers())
        .map(teachers => this.teacherActions.loadAllTeachersSuccess(teachers));

    @Effect() getTeacher$ = this.update$
        .ofType(TeacherActions.GET_TEACHER)
        .map(action => action.payload)
        .switchMap(id => this.service.getTeacher(id))
        .map(teacher => this.teacherActions.getTeacherSuccess(teacher));

    @Effect() loadAvailableTeachers$ = this.update$
        .ofType(TeacherActions.LOAD_AVAILABLE_TEACHERS)
        .map(action => action.payload)
        .switchMap(id => this.service.getAvailableTeachers(id))
        .map(teachers => this.teacherActions.loadAvailableTeachersSuccess(teachers));

    @Effect() addTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.addTeacher(teacher))
        .map(teacherId => this.teacherActions.addTeacherSuccess(teacherId));

    @Effect() navigateToNewTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_SUCCESS)
        .map(action => action.payload)
        .switchMap(teacher => {
            console.log(teacher);
            return Observable.of(this.router.navigate(['teacherdetail', teacher]));
        });

    @Effect() deleteTeacher$ = this.update$
        .ofType(TeacherActions.DELETE_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => this.service.deleteTeacher(teacher))
        .map(() => this.teacherActions.loadAllTeachers());

    @Effect() getTeacherGroups$ = this.update$
        .ofType(TeacherActions.GET_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(teacher => this.service.getTeacherGroups(teacher))
        .map(groups => this.teacherActions.getTeacherGroupsSuccess(groups));

    @Effect() addTeacherGroups$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(obj => this.service.addGroups(obj.teacher, obj.groups))
        .map(teacher => this.teacherActions.changeTeacherGroupsSuccess(teacher));

    @Effect() removeTeacherGroup$ = this.update$
        .ofType(TeacherActions.REMOVE_TEACHER_GROUP)
        .map(action => action.payload)
        .switchMap(obj => this.service.deleteGroup(obj.teacher, obj.group))
        .map(teacher => this.teacherActions.changeTeacherGroupsSuccess(teacher));

    @Effect() getChangedGroups$ = this.update$
        .ofType(TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
        .map(action => action.payload)
        .switchMap(teacher => Observable.of(this.teacherActions.getTeacherGroups(teacher)));

    @Effect() updateAvailableGroups$ = this.update$
        .ofType(TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
        .map(action => action.payload)
        .switchMap(teacher => Observable.of(this.groupActions.loadAvailableTeacherGroups(teacher)));
}