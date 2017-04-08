import { Component, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';

@Component({
    selector: 'group-add-form',
    templateUrl: './group-add-form.component.html'
})
export class GroupAddFormComponent {
    model = new Group();

    @Output() groupSave = new EventEmitter<Group>();
    @Output() groupCancel = new EventEmitter();

    onSubmit() { this.groupSave.emit(this.model); }
    onCancel() { this.groupCancel.emit(); }
}