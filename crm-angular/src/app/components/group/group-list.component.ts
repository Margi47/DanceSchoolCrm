import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class GroupListComponent{
    @Input() groups: Group[];

    @Output() addNewGroup = new EventEmitter();
    @Output() groupDetails = new EventEmitter<number>();
    @Output() loadGroups = new EventEmitter<any>();

    currentPage: number = 1;
    currentFilter: string = "";
    search = new Subject<string>();

    constructor() {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.currentFilter = data;
                this.loadGroups.emit({ page: this.currentPage, filter: data });
            });
    }

    addGroup() { this.addNewGroup.emit(); }
    showDetails(id: number) { this.groupDetails.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.loadGroups.emit({ page: page, filter: this.currentFilter });
    }
}
