import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
    selector: 'user-detail-form',
    templateUrl: './user-detail-form.component.html'
})

export class UserDetailFormComponent {
    @Input() model: User;
    @Output() submit = new EventEmitter<User>();
    @Output() delete = new EventEmitter<number>();

    onSubmit() { this.submit.emit(this.model); }
    onDelete() { this.delete.emit(this.model.id); }
}