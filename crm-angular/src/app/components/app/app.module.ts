import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { TeacherModule } from '../teacher/teacher.module';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error.component';

import { reducers } from '../../reducers';
import { ErrorActions } from '../../actions/error.actions';
import { RouterActions } from '../../actions/router.actions';
import { RouterEffects } from '../../effects/router.effects';

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
        FormsModule,
        GroupModule,
        UserModule,
        TeacherModule,
        SharedModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([RouterEffects]),
        StoreRouterConnectingModule
    ],
    providers: [ErrorActions, RouterActions]
})
export class AppModule {
}
