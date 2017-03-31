import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule,
        FormsModule,
        GroupModule,
        UserModule
    ],
    providers: []
})
export class AppModule {
}
