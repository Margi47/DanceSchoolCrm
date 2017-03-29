import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDetailFormComponent } from '../user/user-detail-form.component';
import { UsersComponent } from '../user/users.component';
import { UserAddComponent } from '../user/user-add.component';
import { UserAddFormComponent } from '../user/user-add-form.component';

import { GroupsComponent } from '../group/groups.component';
import { GroupListComponent } from '../group/group-list.component';
import { GroupDetailComponent } from '../group/group-detail.component';
import { GroupFormComponent } from '../group/group-form.component';

import { UserService } from '../user/user.service';
import { GroupService } from '../../services/group.service';

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
        GroupDetailComponent,
        GroupFormComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule,
        FormsModule
    ],
    providers: [UserService, GroupService]
})
export class AppModule {
}
