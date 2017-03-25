import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-detail-form.component.html'
})

export class UserDetailFormComponent {
    @Input() model: User;
    @Output() userSubmit = new EventEmitter<User>();
    @Output() userDelete = new EventEmitter<number>();

    onUserSubmit(e) { this.userSubmit.emit(this.model); }
    onUserDelete() { this.userDelete.emit(this.model.id); }
}