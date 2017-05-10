import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Error } from '../models/error';

@Injectable() 
export class ErrorActions {
    static CATCH_ERROR = '[Error] Catch Error';
    catchError(error): Action {
        return {
            type: ErrorActions.CATCH_ERROR,
            payload: error
        };
    }
}