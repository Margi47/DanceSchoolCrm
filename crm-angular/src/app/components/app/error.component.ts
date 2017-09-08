import { Component, Input } from '@angular/core';
import { ErrorMessage } from '../../models/error-message'

@Component({
    selector: 'error',
    template: `
<Label *ngIf="errorMessage.statusCode != 0">
    Error: {{errorMessage.message}}
<Label>`
})
export class ErrorComponent{
    @Input() errorMessage: ErrorMessage;
}
