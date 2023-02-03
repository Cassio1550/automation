import { CustomFieldValue } from "../custom-field/custom-field-value";
import { Site } from "../site/site";

export class Device {
    id: number = 0;
    name: string = '';
    address: string = '';
    deviceTypeId: number = 0;
    monitoringId: string = '';
    enabled: boolean = true;
    siteId: number | undefined | null;
    site: Site = new Site();
    customFieldValue: CustomFieldValue[] = new Array<CustomFieldValue>();
}
