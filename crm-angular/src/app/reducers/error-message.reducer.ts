import { ActionWithPayload } from '../actions/actionWithPayload';
import { ErrorPayload } from '../actions/actionWithPayload';

import { ErrorMessage } from '../models/error-message';
import { ErrorActions } from '../actions/error.actions';

export type ErrorMessageState = ErrorMessage;

const initialState: ErrorMessageState = {
    statusCode: 0,
    message: ''
};

export default function (state = initialState, action: ActionWithPayload<ErrorPayload>): ErrorMessageState {
    switch (action.type) {
        case ErrorActions.CATCH_ERROR: {
            let obj: ErrorMessageState = Object.assign({}, state);
            obj.message = action.payload.error.message;
            obj.statusCode = action.payload.code;
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
