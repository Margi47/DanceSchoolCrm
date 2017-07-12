import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { UsersComponent } from '../user/users.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDetailFormComponent } from '../user/user-detail-form.component';
import { UserAddComponent } from '../user/user-add.component';
import { UserAddFormComponent } from '../user/user-add-form.component';

import { FormValidatiionComponent } from '../app/form-validation.component';

import { UserService } from '../../services/user.service';
import { UserActions } from '../../actions/user.actions';
import { UserEffects } from '../../effects/user.effects';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EffectsModule.run(UserEffects)
    ],
    declarations: [
        UsersComponent,
        UserListComponent,
        UserDetailComponent,
        UserDetailFormComponent,       
        UserAddComponent,
        UserAddFormComponent,
        FormValidatiionComponent
    ],
    exports: [UsersComponent],
    providers: [UserService, UserActions]
})
export class UserModule { }