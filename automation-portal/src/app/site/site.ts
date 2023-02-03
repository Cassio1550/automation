import { CustomFieldValue } from "../custom-field/custom-field-value";
import { Customer } from "../customer/customer";

export class Site {
    id: number = 0;
    name: string = '';
    customerId: number = 0;
    customer: Customer = new Customer();
    customFieldValue: CustomFieldValue[] = new Array<CustomFieldValue>();
}
