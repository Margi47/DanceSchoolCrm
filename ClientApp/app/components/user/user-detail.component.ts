import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
    selector: 'user-detail',
    template: `<button (click)="goBack()" class="btn btn-default">Back</button>
               <user-detail-form [model] = "model$ | async" 
                                 (userSubmit)="onUserSubmit($event)" 
                                 (userDelete)="onUserDelete($event)">
               </user-detail-form>`
})

export class UserDetailComponent implements OnInit{
    model$: Observable<User>;

    constructor(private r: Router,
                private router: ActivatedRoute,
                private service: UserService,
                private location: Location) { }

    onUserDelete(id: number) {
        this.service.deleteUser(id).subscribe(() => this.goBack());       
    }

    ngOnInit(): void {
        this.router.params.subscribe(params => this.model$ = this.service.getUser(+params['id']));
    }

    onUserSubmit(user: User): void {      
        this.service.update(user.id, user).subscribe(() => { this.goBack(); });        
    }

    goBack(): void {
        this.r.navigate(['/users']);
    }
}