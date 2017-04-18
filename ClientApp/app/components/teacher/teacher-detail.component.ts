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
import { Location } from '@angular/common';

@Component({
    selector: 'teacher-detail',
    template: `<button (click)="goBack()" class="btn btn-default">Back</button>
               <teacher-detail-form [model] = "model$ | async" 
                                    [allGroups] = "allGroups$ | async"
                                    (showGroupDetails) = "onShowGroupDetails($event)"
                                    (teacherSubmit)="onTeacherSubmit($event)" 
                                    (teacherDelete)="onTeacherDelete($event)">
               </teacher-detail-form>
               `
})

export class TeacherDetailComponent implements OnInit{
    model$: Observable<any>;
    allGroups$: Observable<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private teacherActions: TeacherActions,
        private groupActions: GroupActions,
        private location: Location) {
        this.model$ = this.store.select('teacher');
        this.allGroups$ = this.store.select('groups');
    }

   ngOnInit(): void {
       this.route.params.subscribe(params =>
       {
           this.store.dispatch(this.teacherActions.getTeacher(+params['id']));
           this.store.dispatch(this.teacherActions.getTeacherGroups(+params['id']));
       });

       this.store.dispatch(this.groupActions.loadGroups());
    }

   onShowGroupDetails(id: number) {
       this.router.navigate(['groupdetail', id]);
   }

   onTeacherDelete(teacher: Teacher) {
        this.store.dispatch(this.teacherActions.deleteTeacher(teacher));
        this.goBack();
    }

   onTeacherSubmit(teacher: Teacher): void {
        this.store.dispatch(this.teacherActions.updateTeacher(teacher));
        this.goBack();        
    }

    goBack(): void {
        this.location.back();
    }
}