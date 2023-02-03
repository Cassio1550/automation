import { CustomFieldValue } from "../custom-field/custom-field-value";

export class Team {
    id: number = 0;
    name: string = '';
    isDefault: boolean = false;
    email: string = '';
    customerId: number = 0;
    customFieldValue: CustomFieldValue[] = new Array<CustomFieldValue>();
}
