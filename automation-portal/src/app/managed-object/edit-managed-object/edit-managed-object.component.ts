import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ManagedObjectService } from '../managed-object.service';
import { ManagedObject } from '../managedObject';

@Component({
  selector: 'app-edit-managed-object',
  templateUrl: './edit-managed-object.component.html',
  styleUrls: ['./edit-managed-object.component.scss']
})

export class EditManagedObjectComponent implements OnInit {

    managedObject!: ManagedObject;
    customers: Customer[] = new Array<Customer>();

    constructor(
        private route: ActivatedRoute,
        private service: ManagedObjectService,
        private customerService: CustomerService,
        private router: Router,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.loadManagedObject(id);
        } else {
            this.managedObject = new ManagedObject();
        }

        this.loadCustomers();
    }

    save(event: MouseEvent): void {
        if (this.managedObject.id > 0) {
            this.service.update(this.managedObject).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.managedObject).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["managedobject"]);
    }

    loadManagedObject(id: number): void {
        this.service.get(id).subscribe(managedObject => {
            this.managedObject = managedObject;
        });
    }

    loadCustomers(): void {
        this.customerService.list().subscribe((customers) => {
            this.customers = customers;
        });
    }
}

