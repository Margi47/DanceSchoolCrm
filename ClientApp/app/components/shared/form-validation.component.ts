import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'form-validation',
    templateUrl: 'form-validation.component.html'
})

export class FormValidationComponent{
    @Input() model: FormControl;
    @Input() requiredMessage: string = "Field is required";
    @Input() minMessage: string = "Field has to be longer"; 
    @Input() maxMessage: string = "Field has to be shorter";
    @Input() patternMessage: string = "Field pattern is wrong";

    onShowClick() {
        console.log(this.model);
        console.log(this.model.errors);
    }
}