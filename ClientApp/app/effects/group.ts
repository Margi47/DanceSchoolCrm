import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { GroupActions } from '../actions/group.actions';
import { GroupService } from '../services/group.service';

@Injectable()
export class GroupEffects {
    constructor(
        private update$: Actions,
        private groupActions: GroupActions,
        private service: GroupService,
    ) { }

    @Effect() loadGroups$ = this.update$
        .ofType(GroupActions.LOAD_GROUPS)
        .switchMap(() => this.service.getGroups())
        .map(groups => this.groupActions.loadGroupsSuccess(groups));

    @Effect() getGroup$ = this.update$
        .ofType(GroupActions.GET_GROUP)
        .map(action => action.payload)
        .switchMap(id => this.service.getGroup(id))
        .map(group => this.groupActions.getGroupSuccess(group));

    @Effect() saveGroup$ = this.update$
        .ofType(GroupActions.SAVE_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.update(group))
        .map(group => this.groupActions.saveGroupSuccess(group));

    @Effect() addGroup$ = this.update$
        .ofType(GroupActions.ADD_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.addGroup(group))
        .map(group => this.groupActions.addGroupSuccess(group.group, group.teachers));

    @Effect() addGroupTeachers$ = this.update$
        .ofType(GroupActions.ADD_GROUP_SUCCESS)
        .map(action => {
            console.log(action.payload);
            return { group: action.payload.group.id, teachers: action.payload.teachers.map(t => t.id) };
        })
        .switchMap(group => Observable.of(this.groupActions.addGroupTeachers(group.group, group.teachers)));

    @Effect() addGroupTeacher$ = this.update$
        .ofType(GroupActions.ADD_TEACHERS)
        .map(action => action.payload)
        .switchMap(obj => {
            console.log(obj);
            return this.service.addTeachers(obj.group, obj.teachers);
        })
        .map(group => this.groupActions.addGroupTeachersSuccess(group));

    @Effect() getAddedTeachers$ = this.update$
        .ofType(GroupActions.ADD_TEACHERS_SUCCESS)
        .map(action => action.payload)
        .switchMap(group => Observable.of(this.groupActions.loadTeaches(group)));

    @Effect() loadTeachers$ = this.update$
        .ofType(GroupActions.LOAD_TEACHERS)
        .map(action => action.payload)
        .switchMap(group => this.service.getTeachers(group))
        .map(teachers => this.groupActions.loadTeachesSuccess(teachers));

    @Effect() deleteGroup$ = this.update$
        .ofType(GroupActions.DELETE_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.deleteGroup(group))
        .map(group => this.groupActions.deleteGroupSuccess(group));

    @Effect() loadStudents$ = this.update$
        .ofType(GroupActions.LOAD_STUDENTS)
        .map(action => action.payload)
        .switchMap(group => this.service.getStudents(group))
        .map(users => this.groupActions.loadStudentsSuccess(users));

    @Effect() addGroupStudent$ = this.update$
        .ofType(GroupActions.ADD_STUDENT)
        .map(action => action.payload)
        .switchMap(obj => {
            console.log(obj);
            return this.service.addStudent(obj.group, obj.user);
        })
        .map(user => this.groupActions.addGroupStudentSuccess(user));

    @Effect() removeStudent = this.update$
        .ofType(GroupActions.REMOVE_STUDENT)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeStudent(obj.group, obj.user))
        .map(user => this.groupActions.removeStudentSuccess(user));

    @Effect() removeTeacher = this.update$
        .ofType(GroupActions.REMOVE_TEACHER)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeTeacher(obj.group, obj.teacher))
        .map(teacher => this.groupActions.removeTeacherSuccess(teacher));
}