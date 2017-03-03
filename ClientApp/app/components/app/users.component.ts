import { Component } from '@angular/core';

@Component({
    selector: 'users',
    template: `
<users-list></users-list>
<router-outlet></router-outlet>
`
})
export class UsersComponent {
}