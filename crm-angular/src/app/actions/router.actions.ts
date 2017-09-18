import { Injectable } from '@angular/core';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { NavigationPayload } from '../actions/actionWithPayload';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class RouterActions {
    static GO = '[Navigation] Go';
    go(path: any[], query?: object, extras?: NavigationExtras): ActionWithPayload<NavigationPayload> {
        return {
            type: RouterActions.GO,
            payload: new NavigationPayload(path, query, extras)
        };
    }

    static SHOW = '[Navigation] Show';
    show(path: any[], query?: object, extras?: NavigationExtras): ActionWithPayload<NavigationPayload> {
        return {
            type: RouterActions.SHOW,
            payload: new NavigationPayload(path, query, {...extras, skipLocationChange: true})
        };
    }

    static BACK = '[Navigation] Go Back';
    back(): ActionWithPayload<null> {
        return {
            type: RouterActions.BACK,
            payload: null
        };
    }

    static FORWARD = '[Navigation] Go Forward';
    forward(): ActionWithPayload<null> {
        return {
            type: RouterActions.FORWARD,
            payload: null
        };
    }
}
