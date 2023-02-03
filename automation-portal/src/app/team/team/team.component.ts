import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    teams: Team[] = [];

    customers: Customer[] = [];
    customerId: number = 0;
    subscription!: Subscription

    constructor(
        private service: TeamService,
        private confirmService: ConfirmService,
        private customerService: CustomerService,
        public router: Router,
        public route: ActivatedRoute,
        public authorizationService: AuthorizationService,
    ) {
        this.subscription = this.route.queryParams.subscribe(params => {
            let customerid = params['customerId']
            if (customerid && !isNaN(customerid)) {
                this.customerId = parseInt(customerid);
                this.load();
            }
        });
    }

    ngOnInit(): void {
        this.loadCustomer();
        this.load();
    }

    load(): void {
        if (this.customerId > 0) {
            this.service.listByCustomer(this.customerId)
                .subscribe((teams: Team[]) => {
                    this.teams = teams;
                });
        }
    }

    loadCustomer(): void {
        this.customerService.list()
            .subscribe((customers: Customer[]) => {
                this.customers = customers;
            });
    }

    onChangeCustomer(event: any, customerId: number): void {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { customerId: customerId },
                queryParamsHandling: 'merge'
            });
    }

    delete(teamId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar esta equipe").subscribe(result => {
            if (result) {
                this.service.delete(teamId).subscribe(() => {
                    this.load();
                });
            }
        });
    }
}
