import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/app/user-list.component'
import { UserDetailComponent } from './components/app/user-detail.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/userlist', pathMatch: 'full' },
    { path: 'userlist', component: UserListComponent },
    { path: 'detail', component: UserDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }