import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class GroupListComponent{
    @Input() groups: Group[];

    @Output() addNewGroup = new EventEmitter();
    @Output() groupDetails = new EventEmitter<number>();
    @Output() pageChanged = new EventEmitter<number>();

    currentPage: number = 1;

    addGroup() { this.addNewGroup.emit(); }
    showDetails(id: number) { this.groupDetails.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }
}
