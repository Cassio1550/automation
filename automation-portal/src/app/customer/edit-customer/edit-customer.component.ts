import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomField } from 'src/app/custom-field/custom-field';
import { CustomFieldValue } from 'src/app/custom-field/custom-field-value';
import { CustomFieldService } from 'src/app/custom-field/custom-field.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

    customer!: Customer;
    customFields: CustomField[] = new Array<CustomField>();
    customFieldValues: { [id: number]: CustomFieldValue; } = {};

    constructor(
        private route: ActivatedRoute,
        private service: CustomerService,
        private customFieldService: CustomFieldService,
        private router: Router,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.loadCustomer(id);
        } else {
            this.customer = new Customer();
        }

        this.loadCustomFields();
    }

    save(event: MouseEvent): void {
        this.customer.customFieldValue = new Array<CustomFieldValue>();
        for(let v in this.customFieldValues){
            this.customer.customFieldValue.push(this.customFieldValues[v]);
        }

        if (this.customer.id > 0) {
            this.service.update(this.customer).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.customer).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["customer"]);
    }

    loadCustomer(id: number): void {
        this.service.get(id).subscribe(customer => {
            this.customer = customer;
            this.bindCustomFieldValues(this.customFields, this.customer.customFieldValue);
        });
    }

    loadCustomFields(): void {
        this.customFieldService.listByEntity("customer").subscribe((customFields) => {
            if (this.customer)
                this.bindCustomFieldValues(customFields, this.customer.customFieldValue);
            this.customFields = customFields;
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

}
