import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
//import { Group } from '../../models/group';

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-detail-form.component.html'
})

export class UserDetailFormComponent {
    @Input() model: User;
    //@Input() groups: Group[];
    @Output() userSubmit = new EventEmitter<User>();
    @Output() userDelete = new EventEmitter<User>();

    onUserSubmit() { this.userSubmit.emit(this.model); }
    onUserDelete() { this.userDelete.emit(this.model); }
    //onAddGroup() { }
}