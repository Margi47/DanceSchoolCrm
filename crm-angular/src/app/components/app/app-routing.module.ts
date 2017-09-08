import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../user/users.component'
import { UserListComponent } from '../user/user-list.component'
import { UserDetailComponent } from '../user/user-detail.component';
import { UserAddComponent } from '../user/user-add.component';
import { GroupsComponent } from '../group/groups.component';
import { GroupListComponent } from '../group/group-list.component';
import { GroupDetailComponent } from '../group/group-detail.component';
import { GroupAddComponent } from '../group/group-add.component';
import { TeachersComponent } from '../teacher/teachers.component';
import { TeacherDetailComponent } from '../teacher/teacher-detail.component';
import { TeacherAddComponent } from '../teacher/teacher-add.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'userdetail/:id', component: UserDetailComponent },
    { path: 'useradd', component: UserAddComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'groupdetail/:id', component: GroupDetailComponent },
    { path: 'groupadd', component: GroupAddComponent },
    { path: 'teachers', component: TeachersComponent },
    { path: 'teacherdetail/:id', component: TeacherDetailComponent },
    { path: 'teacheradd', component: TeacherAddComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }