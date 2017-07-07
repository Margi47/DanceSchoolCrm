import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { Group } from '../../models/group';
import { Teacher } from '../../models/teacher';
import { NgForm } from "@angular/forms";
import { ErrorField } from '../../models/error-field';

@Component({
    selector: 'group-add-form',
    templateUrl: './group-form.component.html'
})
export class GroupAddFormComponent implements OnChanges {
    @ViewChild('groupForm') public groupForm: NgForm;
    ngOnChanges() {
        if (this.errors.length > 0) {
            for (let i in this.errors) {
                let item = this.errors[i];
                let nameControl = this.groupForm.form.get(item.key.toLowerCase());
                nameControl.markAsDirty();
                nameControl.setErrors({ ["server"]: item.reasons });
            }
        }
    }

    model = new Group();
    newGroup: boolean = true;
    @Input() errors: ErrorField[];

    @Output() groupSave = new EventEmitter<Group>();
    @Output() groupCancel = new EventEmitter();

    onGroupSubmit() { this.groupSave.emit(this.model); }
    onCancel() { this.groupCancel.emit(); }
}