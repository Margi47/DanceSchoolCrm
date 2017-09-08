import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ngx-paged-select';;

import { TeachersComponent } from '../teacher/teachers.component';
import { TeacherListComponent } from '../teacher/teacher-list.component';
import { TeacherDetailComponent } from '../teacher/teacher-detail.component';
import { TeacherDetailFormComponent } from '../teacher/teacher-detail-form.component';
import { TeacherAddComponent } from '../teacher/teacher-add.component';
import { TeacherAddFormComponent } from '../teacher/teacher-add-form.component';

import { TeacherService } from '../../services/teacher.service';
import { TeacherActions } from '../../actions/teacher.actions';
import { TeacherEffects } from '../../effects/teacher.effects';

@NgModule({
    imports: [
        SharedModule,
        NgxPaginationModule,
        EffectsModule.forFeature([TeacherEffects]),
        SelectModule
    ],
    declarations: [
        TeachersComponent,
        TeacherListComponent,
        TeacherDetailComponent,
        TeacherDetailFormComponent,       
        TeacherAddComponent,
        TeacherAddFormComponent
    ],
    exports: [TeachersComponent],
    providers: [TeacherService, TeacherActions]
})
export class TeacherModule { }
