import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
    selector: 'users-list',
    templateUrl: './user-list.component.html',
    styles: ['tr td, th {vertical-align:middle}']
})

export class UserListComponent{
    @Input() users: User[];

    @Output() add = new EventEmitter();
    @Output() details = new EventEmitter<number>();
    @Output() pageChanged = new EventEmitter<number>();

    currentPage: number = 1;

    addUser() { this.add.emit(); }
    showDetails(id: number) { this.details.emit(id); }

    pageChange(page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }
}
