import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { ErrorMessage } from '../models/error-message';

@Injectable() 
export class ErrorActions {
    static CATCH_ERROR = '[Error] Catch Error';
    catchError(code, error): Action {
        return {
            type: ErrorActions.CATCH_ERROR,
            payload: { code: code, error: error }
        };
    }

    static REMOVE_ERROR = '[Error] Remove Error';
    removeError(): Action {
        return {
            type: ErrorActions.REMOVE_ERROR,
        };
    }

    static CATCH_VALIDATION_ERROR = '[Error] Catch Validation Error';
    catchValidationError(code, error): Action {
        return {
            type: ErrorActions.CATCH_VALIDATION_ERROR,
            payload: { code: code, error: error }
        };
    }

    static REMOVE_VALIDATION_ERROR = '[Error] Remove Validation Error';
    removeValidationError(): Action {
        return {
            type: ErrorActions.REMOVE_VALIDATION_ERROR,
        };
    }
}