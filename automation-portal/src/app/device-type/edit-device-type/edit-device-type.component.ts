import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceType } from '../device-type';
import { DeviceTypeService } from '../device-type.service';

@Component({
  selector: 'app-edit-device-type',
  templateUrl: './edit-device-type.component.html',
  styleUrls: ['./edit-device-type.component.scss']
})
export class EditDeviceTypeComponent implements OnInit {

    deviceType!: DeviceType;

    constructor(
        private route: ActivatedRoute,
        private service: DeviceTypeService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.loadDeviceType(id);
        } else {
            this.deviceType = new DeviceType();
        }
    }

    save(event: MouseEvent): void {
        if (this.deviceType.id > 0) {
            this.service.update(this.deviceType).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.deviceType).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["devicetype"]);
    }

    loadDeviceType(id: number): void {
        this.service.get(id).subscribe(deviceType => {
            this.deviceType = deviceType;
        });
    }
}
