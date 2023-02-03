import { Injectable, TemplateRef } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: any[] = [];

    // Push new Toasts to array with content and options
    show(textOrTpl: string | string[] | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    // Callback method to remove Toast DOM element from view
    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    showStandard(message: string) {
        this.show(message, {
            delay: 2000,
            autohide: true
        });
    }

    showSuccess(message: string, header?: string) {
        this.show(message, {
            classname: 'bg-success text-light',
            delay: 2000,
            autohide: true,
            headertext: header
        });
    }
    showError(message: string, header?: string, error?: any) {
        let m: string | string[];
        let time = 1;
        m = message;
        if (error?.error?.title) {
            m = [message, error?.error?.title];
            let errors = error?.error?.errors;
            if(errors){
                for (error in errors){
                    time++;
                    m.push(`${error}: ${errors[error]}`);
                }
            }
        }

        this.show(m, {
            classname: 'bg-danger text-light',
            delay: 3000 * time,
            autohide: true,
            headertext: header
        });

    }

    showCustomToast(customTpl: string) {
        this.show(customTpl, {
            classname: 'bg-info text-light',
            delay: 2000,
            autohide: true
        });
    }
}
