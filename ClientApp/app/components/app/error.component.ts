import { Component, Input, OnChanges } from '@angular/core';
import { ErrorMessage } from '../../models/error-message'

@Component({
    selector: 'error',
    template: `
<Label *ngIf="errorMessage.statusCode != 0">
    Error: {{errorMessage.message}}
<Label>`
})
export class ErrorComponent implements OnChanges{
    @Input() errorMessage: ErrorMessage;

    ngOnChanges() {
        console.log(this.errorMessage);
    }
}