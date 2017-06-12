import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { Teacher } from '../../models/teacher';

@Component({
    selector: 'group-add-form',
    templateUrl: './group-form.component.html'
})
export class GroupAddFormComponent {
    model = new Group();
    newGroup: boolean = true;

    @Output() groupSave = new EventEmitter<Group>();
    @Output() groupCancel = new EventEmitter();

    onGroupSubmit() { this.groupSave.emit(this.model); }
    onCancel() { this.groupCancel.emit(); }
}