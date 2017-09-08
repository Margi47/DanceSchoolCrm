import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { SelectModule } from 'ngx-paged-select';

import { UsersComponent } from '../user/users.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDetailFormComponent } from '../user/user-detail-form.component';
import { UserAddComponent } from '../user/user-add.component';
import { UserAddFormComponent } from '../user/user-add-form.component';

import { UserService } from '../../services/user.service';
import { UserActions } from '../../actions/user.actions';
import { UserEffects } from '../../effects/user.effects';

@NgModule({
    imports: [
        SharedModule,
        NgxPaginationModule,
        EffectsModule.forFeature([UserEffects]),
        SelectModule
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
    providers: [UserService, UserActions]
})
export class UserModule { }
