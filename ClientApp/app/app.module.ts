import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component';
import { UsersComponent } from './components/app/users.component';
import { UserDetailComponent } from './components/app/user-detail.component'

import { UserService } from './components/app/user.service';

import { AppRoutingModule } from './app-routing.module'


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule
    ],
    providers: [UserService]
})
export class AppModule {
}
