import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../_services/toast.service';

@Component({
    selector: 'app-toasts',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent implements OnInit{
    constructor(public toastService: ToastService) { }

    isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
    isArray(toast: any) { return Array.isArray(toast.textOrTpl); }

    ngOnInit(): void {
    }
}


