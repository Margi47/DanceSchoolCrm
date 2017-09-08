import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'form-validation',
    templateUrl: 'form-validation.component.html',
    styles: ['.alert-danger {line-height: 5px}']
})

export class FormValidationComponent{
    @Input() model: FormControl;
    @Input() fieldName: string;

    private _requiredMessage: string;
    @Input() set requiredMessage(message: string) {
        this._requiredMessage = message;
    }
    get requiredMessage() {
        if (this._requiredMessage) {
            return this._requiredMessage;
        }
        else if (this.fieldName) {
            return this.fieldName + " is required.";
        }
        return "Field is required.";
    }

    private _minMessage: string;
    @Input() set minMessage(message: string) {
        this._minMessage = message;
    }
    get minMessage() {
        if (this._minMessage) {
            return this._minMessage;
        }
        else if (this.fieldName) {
            return this.fieldName + " has to be longer.";
        }
        return "Field has to be longer.";
    }

    private _maxMessage: string;
    @Input() set maxMessage(message: string) {
        this._maxMessage = message;
    }
    get maxMessage() {
        if (this._maxMessage) {
            return this._maxMessage;
        }
        else if (this.fieldName) {
            return this.fieldName + " has to be shorter.";
        }
        return "Field has to be shorter.";
    }

    private _patternMessage: string;
    @Input() set patternMessage(message: string) {
        this._patternMessage = message;
    }
    get patternMessage() {
        if (this._patternMessage) {
            return this._patternMessage;
        }
        else if (this.fieldName) {
            return this.fieldName + " data does not match required pattern.";
        }
        return "Field data does not match required pattern.";
    }
}
