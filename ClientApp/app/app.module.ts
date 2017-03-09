import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { UserListComponent } from './components/app/user-list.component';
import { UserDetailComponent } from './components/app/user-detail.component';
import { TabsComponent } from './components/app/tabs.component';
import { TabComponent } from './components/app/tab.component';
import { UsersComponent } from './components/app/users.component';
import { GroupsComponent } from './components/app/groups.component';


import { UserService } from './components/app/user.service';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        UserListComponent,
        UserDetailComponent,
        TabsComponent,
        TabComponent,
        UsersComponent,
        GroupsComponent,

    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule,
        FormsModule
    ],
    providers: [UserService]
})
export class AppModule {
}
