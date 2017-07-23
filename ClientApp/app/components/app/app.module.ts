import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { TeacherModule } from '../teacher/teacher.module';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error.component';

import reducer from '../../reducers';
import { ErrorActions } from '../../actions/error.actions';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        JsonpModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        GroupModule,
        UserModule,
        TeacherModule,
        SharedModule,
        StoreModule.provideStore(reducer)
    ],
    providers: [ErrorActions, { provide: 'ORIGIN_URL', useValue: location.origin }]
})
export class AppModule {
}
