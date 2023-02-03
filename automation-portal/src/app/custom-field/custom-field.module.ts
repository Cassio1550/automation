import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from './custom-field/custom-field.component';
import { EditCustomFieldComponent } from './edit-custom-field/edit-custom-field.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleSelectCustomFieldComponent } from './custom-field-types/simple-select-custom-field/simple-select-custom-field.component';
import { CustomFieldValueComponent } from './custom-field-value/custom-field-value/custom-field-value.component';
import { SimpleTextCustomFieldValueComponent } from './custom-field-value/custom-field-value-types/simple-text-custom-field-value/simple-text-custom-field-value.component';
import { PipesModule } from '../pipes/pipes.module';
import { LongTextCustomFieldValueComponent } from './custom-field-value/custom-field-value-types/long-text-custom-field-value/long-text-custom-field-value.component';

@NgModule({
    declarations: [CustomFieldComponent, EditCustomFieldComponent, SimpleSelectCustomFieldComponent, CustomFieldValueComponent, SimpleTextCustomFieldValueComponent, LongTextCustomFieldValueComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PipesModule,
    ],
    exports: [
        CustomFieldValueComponent,
    ]
})
export class CustomFieldModule { }
