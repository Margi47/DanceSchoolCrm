import { Action } from '@ngrx/store';

import { ErrorMessage } from '../models/error-message';
import { ErrorActions } from '../actions/error.actions';

export type ErrorMessageState = ErrorMessage;

const initialState: ErrorMessageState = {
    statusCode: 0,
    message: ''
};

export default function (state = initialState, action: Action): ErrorMessageState {
    switch (action.type) {
        case ErrorActions.CATCH_ERROR: {
            let obj: ErrorMessageState = Object.assign({}, state);
            obj.message = action.payload.error.message;
            obj.statusCode = action.payload.code;
            if (action.payload.error.entity) {
                obj.message += "Entity: " + action.payload.error.entity + ", id:" + action.payload.error.id;
                if (action.payload.error.secondId) {
                    obj.message += ", second id:" + action.payload.error.secondId;
                }
            }
            return obj;
        }
        case ErrorActions.REMOVE_ERROR: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
}