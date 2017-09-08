import { Injectable } from '@angular/core';

import { ActionWithPayload } from '../actions/actionWithPayload';
import { ErrorPayload } from '../actions/actionWithPayload';
import { ErrorMessage } from '../models/error-message';

@Injectable() 
export class ErrorActions {
    static CATCH_ERROR = '[Error] Catch Error';
    catchError(code: number, error: any): ActionWithPayload<ErrorPayload> {
        return {
            type: ErrorActions.CATCH_ERROR,
            payload: new ErrorPayload(code, error)
        };
    }

    static REMOVE_ERROR = '[Error] Remove Error';
    removeError(): ActionWithPayload<null> {
        return {
            type: ErrorActions.REMOVE_ERROR,
            payload: null
        };
    }

    static CATCH_VALIDATION_ERROR = '[Error] Catch Validation Error';
    catchValidationError(code: number, error: any): ActionWithPayload<ErrorPayload> {
        return {
            type: ErrorActions.CATCH_VALIDATION_ERROR,
            payload: new ErrorPayload(code, error)
        };
    }

    static REMOVE_VALIDATION_ERROR = '[Error] Remove Validation Error';
    removeValidationError(): ActionWithPayload<null> {
        return {
            type: ErrorActions.REMOVE_VALIDATION_ERROR,
            payload: null
        };
    }
}
