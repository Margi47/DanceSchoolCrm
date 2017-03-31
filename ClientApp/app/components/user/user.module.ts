import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from '../user/users.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDetailFormComponent } from '../user/user-detail-form.component';
import { UserAddComponent } from '../user/user-add.component';
import { UserAddFormComponent } from '../user/user-add-form.component';

import { UserService } from '../user/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        UsersComponent,
        UserListComponent,
        UserDetailComponent,
        UserDetailFormComponent,       
        UserAddComponent,
        UserAddFormComponent
    ],
    exports: [UsersComponent],
    providers: [UserService]
})
export class UserModule { }