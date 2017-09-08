import { Directive, Input, ElementRef, Renderer, OnChanges } from '@angular/core';
import { ErrorField } from '../../models/error-field';
import { NgForm } from "@angular/forms";

@Directive({
    selector: '[serverValidator]'
})
export class ServerValidationDirective implements OnChanges {
    @Input() serverValidator: NgForm;
    @Input() errors: ErrorField[];

    constructor
        (public el: ElementRef, public renderer: Renderer)
    { }

    ngOnChanges() {
        if (this.serverValidator != undefined) {
            if (this.errors.length > 0) {
                for (let i in this.errors) {
                    let item = this.errors[i];
                    let nameControl = this.serverValidator.form.get(item.key.toLowerCase());
                    nameControl.markAsDirty();
                    nameControl.setErrors({ ["server"]: item.reasons });
                }
            }
        }
    }

}

