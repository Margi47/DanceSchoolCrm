import { Injectable } from '@angular/core';
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

    @Effect() loadUsers$ = this.update$
        .ofType(TeacherActions.LOAD_TEACHERS)
        .switchMap(() => this.service.getTeachers())
        .map(teachers => this.teacherActions.loadTeachersSuccess(teachers));

    @Effect() loadAllGroups$ = this.update$
        .ofType(TeacherActions.LOAD_ALL_GROUPS)
        .switchMap(() => this.service.getAllGroups())
        .map(groups => this.teacherActions.loadAllGroupsSuccess(groups));

    @Effect() addTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER)
        .map(action => action.payload)
        .switchMap(teacher => {
            console.log("adding teacher from effect");
            return this.service.addTeacher(teacher);
        })
        .map(teacher => this.teacherActions.addTeacherSuccess(teacher));

    @Effect() addGroupsToNewTeacher$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_SUCCESS)
        .map(action => action.payload)
        .switchMap(teacher => {
            console.log("going to add groups from effect");
            return Observable.of(this.teacherActions.addTeacherGroups(teacher));
        });

    @Effect() addTeacherGroups$ = this.update$
        .ofType(TeacherActions.ADD_TEACHER_GROUPS)
        .map(action => action.payload)
        .switchMap(teacher => {
            console.log("adding groups from effects")
            return this.service.addGroups(teacher);
        })
        .map(teacher => this.teacherActions.addTeacherGroupsSuccess(teacher));



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