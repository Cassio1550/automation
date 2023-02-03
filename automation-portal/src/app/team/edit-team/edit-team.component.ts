import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomField } from 'src/app/custom-field/custom-field';
import { CustomFieldValue } from 'src/app/custom-field/custom-field-value';
import { CustomFieldService } from 'src/app/custom-field/custom-field.service';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
    selector: 'app-edit-team',
    templateUrl: './edit-team.component.html',
    styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit, OnDestroy {

    team!: Team;
    customers: Customer[] = new Array<Customer>();
    customFields: CustomField[] = new Array<CustomField>();
    customFieldValues: { [id: number]: CustomFieldValue; } = {};
    subscription!: Subscription
    queryParams!: Params


    constructor(
        private route: ActivatedRoute,
        private service: TeamService,
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
            this.loadTeam(id);
        } else {
            this.team = new Team();
            this.setCustomerFromQueryString();
        }

        this.loadCustomFields();
        this.loadCustomers();
    }

    setCustomerFromQueryString() {
        if (this.queryParams && this.team) {
            let customerid = this.queryParams['customerId']
            if (customerid && !isNaN(customerid)) {
                this.team.customerId = parseInt(customerid);
            }
        }
    }

    save(event: MouseEvent): void {
        if (this.team.customerId)
            this.team.customerId = this.team.customerId as number;

        this.team.customFieldValue = new Array<CustomFieldValue>();
        for (let v in this.customFieldValues) {
            this.team.customFieldValue.push(this.customFieldValues[v]);
        }

        if (this.team.id > 0) {
            this.service.update(this.team).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.team).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["team"], { queryParams: this.queryParams });
    }

    loadTeam(id: number): void {
        this.service.get(id).subscribe(team => {
            this.team = team;
            this.bindCustomFieldValues(this.customFields, this.team.customFieldValue);
        });
    }

    loadCustomFields(): void {
        this.customFieldService.listByEntity("team").subscribe((customFields) => {
            if (this.team)
                this.bindCustomFieldValues(customFields, this.team.customFieldValue);
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
