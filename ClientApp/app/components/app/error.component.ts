import { Component, Input, OnChanges } from '@angular/core';
import { Error } from '../../models/error'

@Component({
    selector: 'error',
    template: `
<Label *ngIf="errorMessage.message">
    Error: {{errorMessage.statusCode}} - {{errorMessage.message}}
<Label>`
})
export class ErrorComponent implements OnChanges{
    @Input() errorMessage: Error;

    ngOnChanges() {
        console.log(this.errorMessage);
    }
}