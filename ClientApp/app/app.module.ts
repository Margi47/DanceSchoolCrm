import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component';
import { UsersComponent } from './components/app/users.component';

import { UserService } from './components/app/user.service';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        UsersComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule
    ],
    providers: [UserService]
})
export class AppModule {
}
