import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html'
})

export class GroupListComponent {
    @Input() groups: Group[];

    @Output() addNewGroup = new EventEmitter();
    @Output() groupDetails = new EventEmitter<number>();

    addGroup() { this.addNewGroup.emit(); }
    showDetails(id: number) { this.groupDetails.emit(id); }
}