import { Action } from '@ngrx/store';

import { ErrorField } from '../models/error-field';
import { ErrorActions } from '../actions/error.actions';

export type FormErrorState = ErrorField[];

const initialState: FormErrorState = [];

export default function (state = initialState, action: Action): FormErrorState {
    switch (action.type) {
        case ErrorActions.CATCH_VALIDATION_ERROR: {
            console.log(action.payload)
            let result: FormErrorState = Object.assign({}, state);
            var source = action.payload.error.result;
            console.log(source);
            for (var i in action.payload.error.result) {
                console.log(i);
                if (action.payload.error.result.hasOwnProperty(i)) {
                    var value = action.payload.error.result[i];
                    var field : ErrorField = { key: i, reasons: value }; 
                    console.log(field);
                }
            }
            
            return result;
        }
        default: {
            return state;
        }
    }
}