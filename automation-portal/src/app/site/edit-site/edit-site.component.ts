import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomField } from 'src/app/custom-field/custom-field';
import { CustomFieldValue } from 'src/app/custom-field/custom-field-value';
import { CustomFieldService } from 'src/app/custom-field/custom-field.service';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { Site } from '../site';
import { SiteService } from '../site.service';

@Component({
    selector: 'app-edit-site',
    templateUrl: './edit-site.component.html',
    styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit, OnDestroy {

    site!: Site;
    customers: Customer[] = new Array<Customer>();
    customFields: CustomField[] = new Array<CustomField>();
    customFieldValues: { [id: number]: CustomFieldValue; } = {};

    subscription!: Subscription
    queryParams!: Params

    constructor(
        private route: ActivatedRoute,
        private service: SiteService,
        private customFieldService: CustomFieldService,
        private customerService: CustomerService,
        private router: Router,
        public authorizationService: AuthorizationService,
    ) {
        this.subscription = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.setCustomerFromQueryString();
        });
    }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.loadSite(id);
        } else {
            this.site = new Site();
            this.setCustomerFromQueryString();
        }

        this.loadCustomFields();
        this.loadCustomers();
    }

    setCustomerFromQueryString() {
        if (this.queryParams && this.site) {
            let customerid = this.queryParams['customerId']
            if (customerid && !isNaN(customerid)) {
                this.site.customerId = parseInt(customerid);
            }
        }
    }

    save(event: MouseEvent): void {
        if (this.site.customerId){
            this.site.customerId = this.site.customerId as number;
            let customer = this.customers.find(x => x.id == this.site.customerId);
            if(customer)
                this.site.customer = customer;
        }

        this.site.customFieldValue = new Array<CustomFieldValue>();
        for (let v in this.customFieldValues) {
            this.site.customFieldValue.push(this.customFieldValues[v]);
        }

        if (this.site.id > 0) {
            this.service.update(this.site).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.site).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["site"], { queryParams: this.queryParams });
    }

    loadSite(id: number): void {
        this.service.get(id).subscribe(site => {
            this.site = site;
            this.bindCustomFieldValues(this.customFields, this.site.customFieldValue);
        });
    }

    loadCustomFields(): void {
        this.customFieldService.listByEntity("site").subscribe((customFields) => {
            if (this.site)
                this.bindCustomFieldValues(customFields, this.site.customFieldValue);
            this.customFields = customFields;
        });
    }

    loadCustomers(): void {
        this.customerService.list().subscribe((customers) => {
            this.customers = customers;
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}
