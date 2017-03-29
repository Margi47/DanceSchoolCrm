import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../reducers';
import { GroupActions } from '../actions/group.actions';
import { GroupService } from '../services/group.service';

@Injectable()
export class GroupEffects {
    constructor(
        private update$: Actions,
        private groupActions: GroupActions,
        private service: GroupService,
    ) { }

    /*@Effect() loadGroups$ = this.update$
        .ofType(this.groupActions.loadGroups())
        //.whenAction(GroupActions.LOAD_GROUPS)
        .switchMap(() => this.service.getGroups())
        .map(groups => this.groupActions.loadGroupsSuccess(groups));

    @Effect() getHero$ = this.update$
        .ofType(GroupActions.GET_GROUP)
        .map<string>(action => action.payload)
        .switchMap(id => this.svc.getHero(id))
        .map(hero => this.heroActions.getHeroSuccess(hero));

    @Effect() saveHero$ = this.update$
        .ofType(HeroActions.SAVE_HERO)
        .map(action => action.payload)
        .switchMap(hero => this.svc.saveHero(hero))
        .map(hero => this.heroActions.saveHeroSuccess(hero));

    @Effect() addHero$ = this.update$
        .ofType(HeroActions.ADD_HERO)
        .map(action => action.payload)
        .switchMap(hero => this.svc.saveHero(hero))
        .map(hero => this.heroActions.addHeroSuccess(hero));

    @Effect() deleteHero$ = this.update$
        .ofType(HeroActions.DELETE_HERO)
        .map(action => action.payload)
        .switchMap(hero => this.svc.deleteHero(hero))
        .map(hero => this.heroActions.deleteHeroSuccess(hero));*/
}