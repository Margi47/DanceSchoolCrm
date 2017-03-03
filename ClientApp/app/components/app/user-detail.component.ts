import { Component, Input, Output, EventEmitter} from '@angular/core';
import { User } from './user';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})

export class UserDetailComponent {
    @Input()
    user: User

    @Output() userDeleted = new EventEmitter();

    delete() {
        this.userDeleted.emit(this.user);
    }
}