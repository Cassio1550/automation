import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomField } from '../custom-field';
import { CustomFieldService } from '../custom-field.service';

@Component({
    selector: 'app-edit-custom-field',
    templateUrl: './edit-custom-field.component.html',
    styleUrls: ['./edit-custom-field.component.scss']
})
export class EditCustomFieldComponent implements OnInit {

    customfield: CustomField = new CustomField();
    hasDefaultValue: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private service: CustomFieldService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        let id = 0;
        let idParam = this.route.snapshot.paramMap.get('id');
        if (idParam != null)
            id = parseInt(idParam);
        if (id > 0) {
            this.service.get(id).subscribe((customfield: CustomField) => {
                this.customfield = customfield;
            });
        } else {
            this.customfield = new CustomField();
        }

        if (this.customfield.defaultValue) {
            this.hasDefaultValue = true;
        }
    }

    save(event: MouseEvent): void {
        if (this.customfield.id > 0) {
            this.service.update(this.customfield).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.customfield).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["customfield"]);
    }

}
