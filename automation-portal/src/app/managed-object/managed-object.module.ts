import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagedObjectComponent } from './managed-object/managed-object.component';
import { EditManagedObjectComponent } from './edit-managed-object/edit-managed-object.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations: [ManagedObjectComponent, EditManagedObjectComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomFieldModule,
        RouterModule,
        PipesModule,
    ]
})
export class ManagedObjectModule { }
