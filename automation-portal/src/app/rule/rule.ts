import { CustomFieldValue } from "../custom-field/custom-field-value";

export class Rule {
    id: number = 0;
    name: string = '';
    externalName: string = '';
    customFieldValue: CustomFieldValue[] = new Array<CustomFieldValue>();
}
