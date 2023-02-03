import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
    devices: Device[] = [];
    searchTerm: string = '';
    constructor(
        private service: DeviceService,
        private confirmService: ConfirmService,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((devices: Device[]) => {
                this.devices = devices;
            });
    }

    delete(deviceId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar este dispositivo").subscribe(result => {
            if (result) {
                this.service.delete(deviceId).subscribe(() => {
                    this.load();
                });
            }
        });
    }
}
