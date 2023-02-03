import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter' })
export class ListFilterPipe implements PipeTransform {

    transform(list: any[], filterValue: any, filterFields: string[]): any {
        if(!filterValue)
            return list;
        return list.filter(item => {
            for (let filterField of filterFields) {
                if (!item.hasOwnProperty(filterField)){
                    console.log('no property ' + filterField)
                    continue;
                }
                if (typeof item[filterField] === 'string' && item[filterField].search(new RegExp(filterValue, 'i')) > -1) {
                    return true;
                } else if (item[filterField] == filterValue) {
                    return true;
                }
            }
            return false;
        });
    }

}
