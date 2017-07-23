import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';
import { UserActions } from '../../actions/user.actions';
import { TeacherActions } from '../../actions/teacher.actions';
import { ErrorActions } from '../../actions/error.actions';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
    selector: 'group-detail',
    template: `
<div  class="col-sm-6">
    <button (click)="goBack()" class="btn btn-default">Back</button>
    <group-detail-form [errors] = "errors$ | async"
                       [model] = "model$ | async"
                       [allUsers] = "allStudents$ | async"
                       [allTeachers] = "allTeachers$ | async"
                       (deleteGroup) = "deleteGroup($event)"
                       (updateGroup) = "groupUpdate($event)"
                       (groupGoBack) = "goBack()"
                       (showUserDetails) = showUserDetails($event)
                       (addGroupStudent) = addStudentToGroup($event)
                       (removeGroupStudent) = removeGroupStudent($event)
                       (showGroupTeacherDetails) = showTeacherDetails($event)
                       (addGroupTeacher) = addTeacherToGroup($event)
                       (removeGroupTeacher) = removeGroupTeacher($event)>
    </group-detail-form>
</div>`
})

export class GroupDetailComponent implements OnInit {
    model$: Observable<any>;
    allStudents$: Observable<any>;
    allTeachers$: Observable<any>;
    errors$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private userActions: UserActions,
        private teacherActions: TeacherActions,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private errorActions: ErrorActions) {
        this.model$ = store.select('group');
        this.allStudents$ = store.select('users');
        this.allTeachers$ = store.select('teachers');
        this.errors$ = this.store.select('errorFields');
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.store.dispatch(this.groupActions.getGroup(+params['id']));
            this.store.dispatch(this.groupActions.loadStudents(+params['id']));
            this.store.dispatch(this.groupActions.loadTeaches(+params['id']));
            this.store.dispatch(this.userActions.loadAvailableStudents(+params['id']));
            this.store.dispatch(this.teacherActions.loadAvailableTeachers(+params['id']));
        });
    }

    deleteGroup(group: Group) {
        this.store.dispatch(this.groupActions.deleteGroup(group));
        this.goBack();
    }

    groupUpdate(group: Group): void {
        this.store.dispatch(this.groupActions.saveGroup(group));
        this.goBack();
    }

    showUserDetails(id: number) {
        this.router.navigate(['userdetail', id]);
    }

    addStudentToGroup($event) {
        this.store.dispatch(this.groupActions.addGroupStudent($event.groupId, $event.userId));
    }

    removeGroupStudent($event) {
        this.store.dispatch(this.groupActions.removeStudent($event.groupId, $event.studentId));
    }

    showTeacherDetails(id: number) {
        this.router.navigate(['teacherdetail', id]);
    }

    addTeacherToGroup($event) {
        this.store.dispatch(this.groupActions.addGroupTeacher($event.groupId, $event.teacher));
    }

    removeGroupTeacher($event) {
        this.store.dispatch(this.groupActions.removeTeacher($event.groupId, $event.teacherId));
    }

    goBack(): void {
        this.location.back();
        this.store.dispatch(this.errorActions.removeError());
    }
}