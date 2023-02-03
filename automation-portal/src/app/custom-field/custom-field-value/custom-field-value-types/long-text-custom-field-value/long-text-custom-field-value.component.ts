import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-long-text-custom-field-value',
  templateUrl: './long-text-custom-field-value.component.html',
  styleUrls: ['./long-text-custom-field-value.component.scss']
})
export class LongTextCustomFieldValueComponent implements OnInit {

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
