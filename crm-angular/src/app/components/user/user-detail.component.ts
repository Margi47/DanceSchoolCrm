import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';
import { GroupActions } from '../../actions/group.actions';
import { ErrorActions } from '../../actions/error.actions';
import { RouterActions } from '../../actions/router.actions';
import { Location } from '@angular/common';

@Component({
    selector: 'user-detail',
    template: `
<div  class="col-sm-6">
    <button (click)="goBack()" class="btn btn-default">Back</button>
    <user-detail-form [model] = "model$ | async" 
                      [allGroups] = "allGroups$ | async"
                      [errors] = "errors$ | async"
                      (userSubmit)="onUserSubmit($event)" 
                      (userDelete)="onUserDelete($event)"
                      (loadNextGroups)="onLoadNextGroups($event)"
                      (addUserGroup)="onAddGroup($event)"
                      (showGroupDetails)="onShowGroupDetails($event)"
                      (removeUserGroup)="removeUserGroup($event)"
                      (goToTeacher)="goToTeacher($event)"
                      (isTeacherChanged)="isTeacherChanged($event)">
    </user-detail-form>
</div>`
})

export class UserDetailComponent implements OnInit{
    model$: Observable<any>;
    allGroups$: Observable<any>;
    errors$: Observable<any>;

    constructor(
        private routerActions: RouterActions,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private errorActions: ErrorActions,
        private location: Location) {
        this.model$ = this.store.select('user');
        this.allGroups$ = this.store.select('groups');
        this.errors$ = this.store.select('errorFields');
    }

   ngOnInit(): void {
       this.route.params.subscribe(params =>
       {
           this.store.dispatch(this.userActions.getUser(+params['id']));
           this.store.dispatch(this.userActions.loadUserGroups(+params['id']));
           this.store.dispatch(this.groupActions.loadAvailableUserGroups(+params['id'], 1, ""));
       });
   }

    onUserDelete(user: User) {
        this.store.dispatch(this.userActions.deleteUser(user.id));
    }

    onUserSubmit(user: User): void {
        this.store.dispatch(this.userActions.saveUser(user));       
    }

    onLoadNextGroups($event) {
        this.store.dispatch(this.groupActions.loadAvailableUserGroups($event.user, $event.page, $event.filter));
    }

    onAddGroup($event) {
        this.store.dispatch(this.userActions.addUserGroup($event.userId, $event.groupId));
    }

    onShowGroupDetails(groupId: number) {
        this.store.dispatch(this.routerActions.go(['/groupdetail', groupId]));
    }

    removeUserGroup($event) {
        this.store.dispatch(this.userActions.removeUserGroup($event.userId, $event.groupId));
    }

    goToTeacher(id: number) {
        this.store.dispatch(this.routerActions.go(['/teacherdetail', id]));
    }

    isTeacherChanged($event) {
        if ($event.value) {
            this.store.dispatch(this.userActions.createTeacher($event.user));
        } else {
            this.store.dispatch(this.userActions.deleteTeacher($event.user.id));
        }
    }

    goBack(): void {
        this.store.dispatch(this.routerActions.back());
        this.store.dispatch(this.errorActions.removeError());
    }
}
