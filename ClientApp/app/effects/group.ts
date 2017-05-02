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
        .map(() => this.groupActions.loadGroups());

    @Effect() addGroup$ = this.update$
        .ofType(GroupActions.ADD_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.addGroup(group))
        .map(() => this.groupActions.loadGroups());

    @Effect() deleteGroup$ = this.update$
        .ofType(GroupActions.DELETE_GROUP)
        .map(action => action.payload)
        .switchMap(group => this.service.deleteGroup(group))
        .map(() => this.groupActions.loadGroups());

    @Effect() loadTeachers$ = this.update$
        .ofType(GroupActions.LOAD_TEACHERS)
        .map(action => action.payload)
        .switchMap(group => this.service.getTeachers(group))
        .map(teachers => this.groupActions.loadTeachesSuccess(teachers));

    @Effect() addGroupTeachers$ = this.update$
        .ofType(GroupActions.ADD_TEACHERS)
        .map(action => action.payload)
        .switchMap(obj => {
            console.log(obj);
            return this.service.addTeachers(obj.group, obj.teachers);
        })
        .map(group => this.groupActions.loadTeaches(group));

    @Effect() removeTeacher = this.update$
        .ofType(GroupActions.REMOVE_TEACHER)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeTeacher(obj.group, obj.teacher))
        .map(group => this.groupActions.loadTeaches(group));

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
        .map(group => this.groupActions.loadStudents(group));

    @Effect() removeStudent = this.update$
        .ofType(GroupActions.REMOVE_STUDENT)
        .map(action => action.payload)
        .switchMap(obj => this.service.removeStudent(obj.group, obj.user))
        .map(group => this.groupActions.loadStudents(group));
}