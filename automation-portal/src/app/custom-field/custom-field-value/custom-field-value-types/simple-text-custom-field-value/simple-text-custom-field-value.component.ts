import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-simple-text-custom-field-value',
    templateUrl: './simple-text-custom-field-value.component.html',
    styleUrls: ['./simple-text-custom-field-value.component.scss']
})
export class SimpleTextCustomFieldValueComponent implements OnInit {

    @Input() value!: string
    @Input() name!: string
    @Input() required!: any

    @Output() valueChange = new EventEmitter<string>();
    constructor() { }

    ngOnInit(): void {

    }

    isRequired(): boolean {
        if (this.required ==  "true")
            return true;
        else
            return false;
    }

    valueChanged(): void {
        this.valueChange.emit(this.value);
    }

}
