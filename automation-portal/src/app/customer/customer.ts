import { CustomFieldValue } from "../custom-field/custom-field-value";

export class Customer {
    id: number = 0;
    name: string = '';
    mnemonic: string = '';
    enabled: boolean = true;
    customFieldValue: CustomFieldValue[] = new Array<CustomFieldValue>();
}
