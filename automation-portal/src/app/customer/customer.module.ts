import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [CustomerComponent, EditCustomerComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CustomFieldModule,
        PipesModule,
    ]
})
export class CustomerModule { }
