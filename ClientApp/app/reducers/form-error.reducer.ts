import { Action } from '@ngrx/store';

import { ErrorField } from '../models/error-field';
import { ErrorActions } from '../actions/error.actions';

export type FormErrorState = ErrorField[];

const initialState: FormErrorState = [];

export default function (state = initialState, action: Action): FormErrorState {
    switch (action.type) {
        case ErrorActions.CATCH_VALIDATION_ERROR: {
            console.log(action.payload)
            let result: ErrorField[] = [];
            let source = action.payload.error.result;
            for (let i in source) {
                if (source.hasOwnProperty(i)) {
                    let value = source[i];
                    for (let r in value) {
                        console.log(r);
                        if (value[r].search("required") != -1) {
                            value[r] = "required";
                        }
                        if (value[r].search("valid") != -1) {
                            value[r] = "pattern";
                        }    
                        if (value[r].search("maxlength") != -1) {
                            value[r] = "maxlength";
                        }   
                    }
                    
                    let field: ErrorField = { key: i, reasons: value };
                    result = [...result, field];
                    console.log(result);
                }
            }

            return result;
        }
        default: {
            return state;
        }
    }
}