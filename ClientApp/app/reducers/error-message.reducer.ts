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
            console.log(action.payload)
            obj.message = action.payload.error.message;
            obj.statusCode = action.payload.code;
            if (action.payload.error.entity) {
                obj.message += "Entity: " + action.payload.error.entity + ", id:" + action.payload.error.id;
                if (action.payload.entity.secondid) {
                    obj.message += ", second id:" + action.payload.error.secondid;
                }
            }
            console.log(obj);
            return obj;
        }
        default: {
            return state;
        }
    }
}