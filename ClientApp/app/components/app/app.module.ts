import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDetailFormComponent } from '../user/user-detail-form.component';
import { UsersComponent } from '../user/users.component';
import { UserAddComponent } from '../user/user-add.component';
import { UserAddFormComponent } from '../user/user-add-form.component';

import { GroupsComponent } from '../group/groups.component';
import { GroupListComponent } from '../group/group-list.component';
import { GroupAddComponent } from '../group/group-add.component';
import { GroupDetailComponent } from '../group/group-detail.component';
import { GroupDetailFormComponent } from '../group/group-detail-form.component';
import { GroupAddFormComponent } from '../group/group-add-form.component';
import reducer from '../../reducers';

import { UserService } from '../user/user.service';
import { GroupService } from '../../services/group.service';
import { GroupActions } from '../../actions/group.actions';
import { GroupEffects } from '../../effects/group';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        UserListComponent,
        UserDetailComponent,
        UserDetailFormComponent,
        UsersComponent,
        UserAddComponent,
        UserAddFormComponent,
        GroupsComponent,
        GroupListComponent,
        GroupAddComponent,
        GroupDetailComponent,
        GroupDetailFormComponent,
        GroupAddFormComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule,
        FormsModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(GroupEffects)
    ],
    providers: [UserService, GroupService, GroupActions]
})
export class AppModule {
}
