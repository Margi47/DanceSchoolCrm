import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../user/users.component'
import { UserListComponent } from '../user/user-list.component'
import { UserDetailComponent } from '../user/user-detail.component';
import { UserAddComponent } from '../user/user-add.component';
import { GroupsComponent } from '../group/groups.component';
import { GroupListComponent } from '../group/group-list.component';
import { GroupDetailComponent } from '../group/group-detail.component';
import { GroupFormComponent } from '../group/group-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'userdetail/:id', component: UserDetailComponent },
    { path: 'useradd', component: UserAddComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'groupdetail/:id', component: GroupDetailComponent },
    { path: 'groupform', component: GroupFormComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }