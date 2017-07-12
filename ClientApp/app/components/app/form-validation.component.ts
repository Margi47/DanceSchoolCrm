import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'form-validation',
    templateUrl: 'form-validation.component.html'
})

export class FormValidatiionComponent{
    @Input() model: FormControl;
    @Input() requiredMessage: string = "Field is required";
    @Input() minMessage: string = "Field has to be longer";     //+ this.model.errors.minlength.requiredLength;
    @Input() maxMessage: string = "Field has to be shorter";
    @Input() patternMessage: string = "Field pattern is wrong";

    onShowClick() {
        console.log(this.model);
        console.log(this.model.errors);
        /*if (this.model.errors) {
            let fields: any[] = [this.model.errors.required, this.model.errors.minlength, this.model.errors.maxlength, this.model.errors.pattern];

            for (let f of fields) {
                
                if (f) {
                    let i = fields.indexOf(f);
                    console.log(i);
                    f = "Message";
                }
            }
            console.log(fields[0]);
            console.log(fields[1]);
            console.log(this.model.errors.required);
        }*/
    }
}