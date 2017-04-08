import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';

@Component({
    selector: 'group-detail-form',
    templateUrl: './group-detail-form.component.html'
})

export class GroupDetailFormComponent{
    @Input() model: Group;

    @Output() deleteGroup = new EventEmitter<Group>();
    @Output() updateGroup = new EventEmitter<Group>();
    @Output() groupGoBack = new EventEmitter();

    onGroupDelete() { this.deleteGroup.emit(this.model); }
    onGroupSubmit() { this.updateGroup.emit(this.model); }
    goBack() { this.groupGoBack.emit(); }
}