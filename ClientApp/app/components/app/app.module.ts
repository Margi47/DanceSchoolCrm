import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from '../user/user-list.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UsersComponent } from '../user/users.component';
import { UserFormComponent } from '../user/user-form.component';

import { GroupListComponent } from '../group/group-list.component';
import { GroupDetailComponent } from '../group/group-detail.component';
import { GroupFormComponent } from '../group/group-form.component';

import { UserService } from '../user/user.service';
import { GroupService } from '../group/group.service';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        UserListComponent,
        UserDetailComponent,
        UsersComponent,
        UserFormComponent,
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
