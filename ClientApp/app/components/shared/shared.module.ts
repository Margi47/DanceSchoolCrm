import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormValidationComponent } from './form-validation.component';
import { ServerValidationDirective } from './server-validation.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        FormValidationComponent,
        ServerValidationDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        FormValidationComponent,
        ServerValidationDirective
    ]
})
export class SharedModule {
}
