import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from '../user/user-list.component'
import { UserDetailComponent } from '../user/user-detail.component';
import { UsersComponent } from '../user/users.component';
import { UserFormComponent } from '../user/user-form.component';
import { GroupListComponent } from '../group/group-list.component';
import { GroupDetailComponent } from '../group/group-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/userlist', pathMatch: 'full' },
    { path: 'userlist', component: UserListComponent },
    { path: 'userdetail/:id', component: UserDetailComponent },
    { path: 'userForm', component: UserFormComponent },
    { path: 'grouplist', component: GroupListComponent },
    { path: 'groupdetail/:id', component: GroupDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }