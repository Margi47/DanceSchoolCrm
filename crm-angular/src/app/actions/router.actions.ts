import { Injectable } from '@angular/core';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { NavigationPayload } from '../actions/actionWithPayload';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class RouterActions {
    static GO = '[Navigation] Go';
    Go(path: any[], query?: object, extras?: NavigationExtras): ActionWithPayload<NavigationPayload> {
        return {
            type: RouterActions.GO,
            payload: new NavigationPayload(path, query, extras)
        };
    }

    static BACK = '[Navigation] Go Back';
    Back(): ActionWithPayload<null> {
        return {
            type: RouterActions.BACK,
            payload: null
        };
    }

    static FORWARD = '[Navigation] Go Forward';
    Forward(): ActionWithPayload<null> {
        return {
            type: RouterActions.FORWARD,
            payload: null
        };
    }
}
