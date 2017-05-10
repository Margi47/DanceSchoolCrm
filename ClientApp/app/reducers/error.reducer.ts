import { Action } from '@ngrx/store';

import { Error } from '../models/error';
import { ErrorActions } from '../actions/error.actions';

export type ErrorState = Error;

const initialState: ErrorState = {
    statusCode: 0,
    message: ''
};

export default function (state = initialState, action: Action): ErrorState {
    switch (action.type) {
        case ErrorActions.CATCH_ERROR: {
            console.log(action.payload.statusText)
            return Object.assign({}, state, { message: action.payload.statusText });
        }
        default: {
            return state;
        }
    }
}