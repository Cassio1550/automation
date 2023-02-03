import { Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../custom-field';

@Component({
    selector: 'app-simple-select-custom-field',
    templateUrl: './simple-select-custom-field.component.html',
    styleUrls: ['./simple-select-custom-field.component.scss']
})
export class SimpleSelectCustomFieldComponent implements OnInit {

    @Input() customfield!: CustomField;
    constructor() { }

    ngOnInit(): void {
    }

}
