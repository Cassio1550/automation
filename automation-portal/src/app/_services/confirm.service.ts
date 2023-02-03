import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

interface ConfirmOptions {
    title: string,
    message: string,
    result: Subject<boolean>,
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {
    modals = new Subject<ConfirmOptions>();
    constructor(
    ) {
    }

    confirm(title: string, message: string): Observable<boolean> {
        let options = {
            title: title,
            message: message,
            result: new Subject<boolean>(),
        }
        this.modals.next(options);
        return options.result;
    }
}
