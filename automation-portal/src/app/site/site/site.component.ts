import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { Site } from '../site';
import { SiteService } from '../site.service';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

    sites: Site[] = [];

    customers: Customer[] = [];
    customerId: number = 0;

    subscription!: Subscription

    constructor(
        private service: SiteService,
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
                .subscribe((sites: Site[]) => {
                    this.sites = sites;
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

    delete(siteId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar esta localidade").subscribe(result => {
            if (result) {
                this.service.delete(siteId).subscribe(() => {
                    this.load();
                });
            }
        });
    }
}
