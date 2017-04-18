import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';
import { GroupActions } from '../../actions/group.actions';
import { Location } from '@angular/common';

@Component({
    selector: 'user-detail',
    template: `<button (click)="goBack()" class="btn btn-default">Back</button>
               <user-detail-form [model] = "model$ | async" 
                                 [allGroups] = "allGroups$ | async"
                                 (userSubmit)="onUserSubmit($event)" 
                                 (userDelete)="onUserDelete($event)"
                                 (addUserGroup)="onAddGroup($event)"
                                 (showGroupDetails)="onShowGroupDetails($event)"
                                 (removeUserGroup)="removeUserGroup($event)">
               </user-detail-form>
               `
})

export class UserDetailComponent implements OnInit{
    model$: Observable<any>;
    allGroups$: Observable<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private userActions: UserActions,
        private groupActions: GroupActions,
        private location: Location) {
        this.model$ = this.store.select('user');
        this.allGroups$ = this.store.select('groups');
    }

   ngOnInit(): void {
       this.route.params.subscribe(params =>
       {
           this.store.dispatch(this.userActions.getUser(+params['id']));
           this.store.dispatch(this.userActions.loadUserGroups(+params['id']));
       });

       this.store.dispatch(this.groupActions.loadGroups());
   }

    onUserDelete(user: User) {
        this.store.dispatch(this.userActions.deleteUser(user));
        this.goBack();
    }

    onUserSubmit(user: User): void {
        this.store.dispatch(this.userActions.saveUser(user));
        this.goBack();        
    }

    onAddGroup($event) {
        console.log($event.userId + "from comp");
        console.log($event.groupId + "from comp");
        this.store.dispatch(this.userActions.addUserGroup($event.userId, $event.groupId));
    }

    onShowGroupDetails(groupId: number) {
        this.router.navigate(['/groupdetail', groupId]);
    }

    removeUserGroup($event) {
        this.store.dispatch(this.userActions.removeUserGroup($event.userId, $event.groupId));
    }

    goBack(): void {
        this.location.back();
    }
}