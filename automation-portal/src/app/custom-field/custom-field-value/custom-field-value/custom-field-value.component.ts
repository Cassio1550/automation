import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { CustomField } from '../../custom-field';

@Component({
    selector: 'app-custom-field-value',
    templateUrl: './custom-field-value.component.html',
    styleUrls: ['./custom-field-value.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CustomFieldValueComponent),
        }
    ]
})
export class CustomFieldValueComponent implements OnInit, ControlValueAccessor {

    @Input() customFieldType!: string;
    @Input() template!: string;
    @Input() name!: string;
    @Input() mandatory!: boolean;
    @Input() required!: any;

    val!: string;

    constructor() { }

    set value(val: string) {
        this.val = val
        this.onChange(val)
        this.onTouch(val)
    }

    get value() {
        return this.val;
    }

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }

    onChange: any = () => { }
    onTouch: any = () => { }

    ngOnInit(): void {
        if (this.required == undefined) {
            this.required = false;
        }
    }
}
