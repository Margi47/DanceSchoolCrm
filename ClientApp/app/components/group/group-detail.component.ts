import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';;
import { AppState } from '../../reducers';
import { GroupActions } from '../../actions/group.actions';
import { Router } from '@angular/router'

@Component({
    selector: 'group-detail',
    template: `
<group-detail-form [model] = "model$ | async"
                   (deleteGroup) = "deleteGroup($event)"
                   (updateGroup) = "groupUpdate($event)"
                   (groupGoBack) = "goBack()">
</group-detail-form>`
})

export class GroupDetailComponent implements OnInit {
    model$: Observable<Group>;

    constructor(
        private store: Store<AppState>,
        private groupActions: GroupActions,
        private router: Router,
        private route: ActivatedRoute, ) {
        this.model$ = store.select('group');
    }

    ngOnInit(): void {
        this.route.params.subscribe(params =>
            this.store.dispatch(this.groupActions.getGroup(+params['id'])));
    }

    deleteGroup(group: Group) {
        this.store.dispatch(this.groupActions.deleteGroup(group));
        this.goBack();
    }

    groupUpdate(group: Group): void {
        this.store.dispatch(this.groupActions.saveGroup(group));
        this.goBack();
    }

    goBack(): void {
        this.router.navigate(['/groups']);
    }
}