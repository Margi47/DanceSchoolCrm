import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
    selector: 'users-list',
    templateUrl: './user-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class UserListComponent{
    @Input() users: User[];

    @Output() add = new EventEmitter();
    @Output() details = new EventEmitter<number>();
    @Output() loadUsers = new EventEmitter<any>();

    currentPage: number = 1;
    currentFilter: string = "";
    search = new Subject<string>();

    constructor() {
        const observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.currentFilter = data;
                this.loadUsers.emit({ page: this.currentPage, filter: data });
            });
    }

    addUser() { this.add.emit(); }
    showDetails(id: number) { this.details.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.loadUsers.emit({ page: page, filter: this.currentFilter });
    }
}
