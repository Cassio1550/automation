import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomField } from 'src/app/custom-field/custom-field';
import { CustomFieldValue } from 'src/app/custom-field/custom-field-value';
import { CustomFieldService } from 'src/app/custom-field/custom-field.service';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { DeviceType } from 'src/app/device-type/device-type';
import { DeviceTypeService } from 'src/app/device-type/device-type.service';
import { Site } from 'src/app/site/site';
import { SiteService } from 'src/app/site/site.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
    selector: 'app-edit-device',
    templateUrl: './edit-device.component.html',
    styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {

    device!: Device;
    customers: Customer[] = new Array<Customer>();
    sites: Site[] = new Array<Site>();
    deviceTypes: DeviceType[] = new Array<DeviceType>();
    customFields: CustomField[] = new Array<CustomField>();
    customFieldValues: { [id: number]: CustomFieldValue; } = {};

    constructor(
        private route: ActivatedRoute,
        private service: DeviceService,
        private customFieldService: CustomFieldService,
        private customerService: CustomerService,
        private siteService: SiteService,
        private deviceTypeService: DeviceTypeService,
        private router: Router,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.loadDevice(id);
        } else {
            this.device = new Device();
        }

        this.loadCustomFields();
        this.loadCustomers();
        this.loadDeviceTypes();
    }

    save(event: MouseEvent): void {
        if (this.device.siteId) {
            this.device.siteId = this.device.siteId as number;
            let site = this.sites.find(x => x.id == this.device.siteId);
            if(site)
                this.device.site = site;
        }

        this.device.customFieldValue = new Array<CustomFieldValue>();
        for (let v in this.customFieldValues) {
            this.device.customFieldValue.push(this.customFieldValues[v]);
        }

        if (this.device.id > 0) {
            this.service.update(this.device).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.device).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["device"]);
    }

    loadDevice(id: number): void {
        this.service.get(id).subscribe(device => {
            this.device = device;
            this.loadSites();
            this.bindCustomFieldValues(this.customFields, this.device.customFieldValue);
        });
    }

    loadCustomFields(): void {
        this.customFieldService.listByEntity("device").subscribe((customFields) => {
            if (this.device)
                this.bindCustomFieldValues(customFields, this.device.customFieldValue);
            this.customFields = customFields;
        });
    }

    loadCustomers(): void {
        this.customerService.list().subscribe((customers) => {
            this.customers = customers;
        });
    }

    loadSites(): void {
        if (this.device?.site?.customerId && this.device?.site?.customerId > 0) {
            this.siteService.listByCustomer(this.device.site.customerId).subscribe((sites) => {
                this.sites = sites;
            });
        }
    }

    loadDeviceTypes(): void {
        this.deviceTypeService.list().subscribe((deviceTypes) => {
            this.deviceTypes = deviceTypes;
        });
    }

    bindCustomFieldValues(customFields: CustomField[], customFieldValues: CustomFieldValue[]): void {
        if (customFields.length == 0) {
            return;
        }

        for (let customField of customFields) {
            let cfv = new CustomFieldValue();
            cfv.customFieldId = customField.id;

            let existentValue = customFieldValues.find(value => value.customFieldId == customField.id);
            cfv.value = existentValue ? existentValue.value : customField.defaultValue;

            this.customFieldValues[customField.id] = cfv;
        }
    }

    onCustomerChange(event: Event, customerId: number): void {
        if (this.device) {
            this.device.siteId = null;
        }
        this.sites = [];
        this.loadSites();
    }

}



