import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';;
import { AppState } from '../../reducers';
import { TeacherActions } from '../../actions/teacher.actions';
import { GroupActions } from '../../actions/group.actions';
import { RouterActions } from '../../actions/router.actions';
import { ErrorActions } from '../../actions/error.actions';

@Component({
    selector: 'teacher-detail',
    template: `<div class="col-sm-6">
                    <button (click)="goBack()" class="btn btn-default" type = "button">Back</button>
                    <teacher-detail-form [model] = "model$ | async" 
                                         [allGroups] = "allGroups$ | async"
                                         (loadNextPage) = "loadNextGroups($event)"
                                         (showGroupDetails) = "onShowGroupDetails($event)"
                                         (showUser) = "onShowUserInfo($event)"
                                         (teacherDelete)="onTeacherDelete($event)"
                                         (addGroup) = "onAddGroup($event)"
                                         (removeGroup) = "onRemoveGroup($event)">
                    </teacher-detail-form>
               <div>
               `
})

export class TeacherDetailComponent implements OnInit{
    model$: Observable<any>;
    allGroups$: Observable<any>;

    constructor(
        private routerActions: RouterActions,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private teacherActions: TeacherActions,
        private groupActions: GroupActions,
        private errorActions: ErrorActions) {
        this.model$ = this.store.select('teacher');
        this.allGroups$ = this.store.select('groups');
    }

   ngOnInit(): void {
       this.route.params.subscribe(params =>
       {
           this.store.dispatch(this.teacherActions.getTeacher(+params['id']));
           this.store.dispatch(this.teacherActions.getTeacherGroups(+params['id']));
           this.store.dispatch(this.groupActions.loadAvailableTeacherGroups(+params['id'], 1));
       });
    }

   loadNextGroups($event) {
       this.store.dispatch(this.groupActions.loadAvailableTeacherGroups($event.teacher, $event.page));
   }

   onShowGroupDetails(id: number) {
       this.store.dispatch(this.routerActions.go(['groupdetail', id]));
   }

   onShowUserInfo(id: number) {
       this.store.dispatch(this.routerActions.go(['userdetail', id]));
   }

   onTeacherDelete(teacher: Teacher) {
        this.store.dispatch(this.teacherActions.deleteTeacher(teacher.id));
   }

   onAddGroup($event) {
       this.store.dispatch(this.teacherActions.addTeacherGroup($event.teacher, $event.group));
   }

   onRemoveGroup($event) {
       this.store.dispatch(this.teacherActions.removeTeacherGroup($event.group, $event.teacher));
   }

   goBack(): void {
       this.store.dispatch(this.routerActions.back());
       this.store.dispatch(this.errorActions.removeError());
    }
}
