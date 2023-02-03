import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceTypeComponent } from './device-type/device-type.component';
import { EditDeviceTypeComponent } from './edit-device-type/edit-device-type.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DeviceTypeComponent, EditDeviceTypeComponent],
  imports: [
    CommonModule,
        RouterModule,
        FormsModule,
  ]
})
export class DeviceTypeModule { }
