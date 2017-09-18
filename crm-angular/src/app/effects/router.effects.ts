import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterActions } from '../actions/router.actions';

import { ActionWithPayload } from '../actions/actionWithPayload';
import { NavigationPayload } from '../actions/actionWithPayload';


@Injectable()
export class RouterEffects {
    constructor(
        private update$: Actions,
        private routerActions: RouterActions,
        private router: Router,
        private location: Location
    ) { }

    @Effect({ dispatch: false })
    go$ = this.update$
        .ofType(RouterActions.GO)
        .map((action: ActionWithPayload<NavigationPayload>) => action.payload)
        .do(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras }));
    
    @Effect({ dispatch: false })
    back$ = this.update$
        .ofType(RouterActions.BACK)
        .do(() => this.location.back());

    @Effect({ dispatch: false })
    forward$ = this.update$
        .ofType(RouterActions.FORWARD)
        .do(() => this.location.forward());
}
