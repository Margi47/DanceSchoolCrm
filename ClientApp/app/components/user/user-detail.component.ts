import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';;
import { AppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';

@Component({
    selector: 'user-detail',
    template: `<button (click)="goBack()" class="btn btn-default">Back</button>
               <user-detail-form [model] = "model$ | async" 
                                 
                                 (userSubmit)="onUserSubmit($event)" 
                                 (userDelete)="onUserDelete($event)">
               </user-detail-form>
               `
})

export class UserDetailComponent implements OnInit{
    model$: Observable<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private userActions: UserActions) {
        this.model$ = this.store.select('user');
    }

   ngOnInit(): void {
       this.route.params.subscribe(params =>
       {
           this.store.dispatch(this.userActions.getUser(+params['id']));
           this.store.dispatch(this.userActions.loadUserGroups(+params['id']));
       });
   }

    onUserDelete(user: User) {
        this.store.dispatch(this.userActions.deleteUser(user));
        this.goBack();
    }

    onUserSubmit(user: User): void {
        this.store.dispatch(this.userActions.saveUser(user));
        this.goBack();        
    }

    goBack(): void {
        this.router.navigate(['/users']);
    }
}