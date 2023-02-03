import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { DeviceType } from '../device-type';
import { DeviceTypeService } from '../device-type.service';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {

    deviceTypes: DeviceType[] = [];

    constructor(
        private service: DeviceTypeService,
        private confirmService: ConfirmService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((deviceTypes: DeviceType[]) => {
                this.deviceTypes = deviceTypes;
            });
    }

    delete(deviceTypesId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar este tipo de dispositivo").subscribe(result => {
            if (result) {
                this.service.delete(deviceTypesId).subscribe(() => {
                    this.load();
                });
            }
        });
    }

}
