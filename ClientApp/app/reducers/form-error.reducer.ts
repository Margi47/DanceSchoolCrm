import { Action } from '@ngrx/store';

import { ErrorField } from '../models/error-field';
import { ErrorActions } from '../actions/error.actions';

export type FormErrorState = ErrorField[];

const initialState: FormErrorState = [];

export default function (state = initialState, action: Action): FormErrorState {
    switch (action.type) {
        case ErrorActions.CATCH_VALIDATION_ERROR: {
            let result: ErrorField[] = [];
            let source = action.payload.error.result;
            for (let i in source) {
                if (source.hasOwnProperty(i)) {
                    let value = source[i];
                    let field: ErrorField = { key: i, reasons: value };
                    result = [...result, field];
                }
            }
            return result;
        }
        case ErrorActions.REMOVE_VALIDATION_ERROR: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
}