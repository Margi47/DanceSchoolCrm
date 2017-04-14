import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';;
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';
import { UserActions } from '../../actions/user.actions';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
    selector: 'group-detail',
    template: `
<group-detail-form [model] = "model$ | async"
                   [allUsers] = "allUsers$ | async"
                   (deleteGroup) = "deleteGroup($event)"
                   (updateGroup) = "groupUpdate($event)"
                   (groupGoBack) = "goBack()"
                   (showUserDetails) = showUserDetails($event)
                   (addGroupStudent) = addStudentToGroup($event)
                   (removeGroupStudent) = removeGroupStudent($event)>
</group-detail-form>`
})

export class GroupDetailComponent implements OnInit {
    model$: Observable<any>;
    allUsers$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private userActions: UserActions,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {
        this.model$ = store.select('group');
        this.allUsers$ = store.select('users');
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.store.dispatch(this.groupActions.getGroup(+params['id']));
            this.store.dispatch(this.groupActions.loadStudents(+params['id']));
        });
        this.store.dispatch(this.userActions.loadUsers());
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

    goBack(): void {
        this.location.back();
    }
}