import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomField } from 'src/app/custom-field/custom-field';
import { CustomFieldValue } from 'src/app/custom-field/custom-field-value';
import { CustomFieldService } from 'src/app/custom-field/custom-field.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { Rule } from '../rule';
import { RuleService } from '../rule.service';

@Component({
    selector: 'app-edit-rule',
    templateUrl: './edit-rule.component.html',
    styleUrls: ['./edit-rule.component.scss']
})
export class EditRuleComponent implements OnInit {

    rule!: Rule;
    customFields: CustomField[] = new Array<CustomField>();
    customFieldValues: { [id: number]: CustomFieldValue; } = {};

    constructor(
        private route: ActivatedRoute,
        private service: RuleService,
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
            this.loadRule(id);
        } else {
            this.rule = new Rule();
        }

        this.loadCustomFields();
    }

    save(event: MouseEvent): void {
        this.rule.customFieldValue = new Array<CustomFieldValue>();
        for (let v in this.customFieldValues) {
            this.rule.customFieldValue.push(this.customFieldValues[v]);
        }

        if (this.rule.id > 0) {
            this.service.update(this.rule).subscribe(() => {
                this.goBack(event);
            });
        } else {
            this.service.create(this.rule).subscribe(() => {
                this.goBack(event);
            });
        }
    }

    goBack(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(["rule"]);
    }

    loadRule(id: number): void {
        this.service.get(id).subscribe(rule => {
            this.rule = rule;
            this.bindCustomFieldValues(this.customFields, this.rule.customFieldValue);
        });
    }

    loadCustomFields(): void {
        this.customFieldService.listByEntity("rule").subscribe((customFields) => {
            if (this.rule)
                this.bindCustomFieldValues(customFields, this.rule.customFieldValue);
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
