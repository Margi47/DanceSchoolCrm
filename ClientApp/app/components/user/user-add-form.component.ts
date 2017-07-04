import { Component, Output, Input, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { ErrorField } from '../../models/error-field';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'user-add-form',
    templateUrl: './user-form.component.html'
})
export class UserAddFormComponent implements OnChanges {
    @ViewChild('userForm') public userForm: NgForm;
    ngOnChanges() {
        console.log(this.errors);
        if (this.errors.length > 0) {
            for (let i in this.errors) {
                let item = this.errors[i];
                let nameControl = this.userForm.form.get(item.key.toLowerCase());
                nameControl.markAsDirty();
                nameControl.setErrors({ ["server"]: true });
                
            }
        }
    }
    

    model = new User();
    newUser: boolean = true;
    @Input() errors: ErrorField[];
    @Output() userSave = new EventEmitter<User>()
    @Output() userCancel = new EventEmitter()

    onUserSubmit() { this.userSave.emit(this.model); }
    onUserCancel() { this.userCancel.emit(); }
    isActiveClicked(value: boolean) {
        if (!value) {
            this.model.isActive = false;
            this.model.isAdmin = false;
            this.model.isTeacher = false;
        } else {
            this.model.isActive = true;
        }
    }
}