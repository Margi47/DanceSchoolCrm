import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
    selector: 'users-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent{
    @Input() users: User[];
    @Output() add = new EventEmitter();
    @Output() details = new EventEmitter<number>();

    addUser() { this.add.emit(); }
    showDetails(id: number) { this.details.emit(id); }
}