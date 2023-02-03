import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    customers: Customer[] = [];
    searchTerm: string = '';
    constructor(
        private service: CustomerService,
        private confirmService: ConfirmService,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((customers: Customer[]) => {
                this.customers = customers;
            });
    }

    delete(customerId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar este cliente").subscribe(result => {
            if (result) {
                this.service.delete(customerId).subscribe(() => {
                    this.load();
                });
            }
        });
    }
}
