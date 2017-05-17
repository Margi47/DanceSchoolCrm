import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

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
        CommonModule,
        FormsModule,
        EffectsModule.run(TeacherEffects)
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