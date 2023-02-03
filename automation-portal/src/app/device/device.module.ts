import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from './device/device.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations: [DeviceComponent, EditDeviceComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomFieldModule,
        RouterModule,
        PipesModule,
    ]
})
export class DeviceModule { }
