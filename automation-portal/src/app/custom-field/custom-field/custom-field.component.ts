import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { CustomField } from '../custom-field';
import { CustomFieldService } from '../custom-field.service';

@Component({
    selector: 'app-custom-field',
    templateUrl: './custom-field.component.html',
    styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent implements OnInit {
    customfields: CustomField[] = [];
    searchTerm: string = '';

    constructor(
        private service: CustomFieldService,
        private confirmService: ConfirmService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((customfields: CustomField[]) => {
                this.customfields = customfields;
            });
    }

    delete(customerId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar este campo customizado").subscribe(result => {
            if (result) {
                this.service.delete(customerId).subscribe(() => {
                    this.load();
                });
            }
        });
    }
}
