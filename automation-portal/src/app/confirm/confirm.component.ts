import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from '../_services/confirm.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {

    @ViewChild('modal') modal: ElementRef | undefined;

    title: string = "teste";
    message: string = "message";


    constructor(
        private modalService: NgbModal,
        private confirmService: ConfirmService,
    ) {

    }
    ngAfterViewInit(): void {
        this.confirmService.modals.subscribe(options => {
            if (this.modal) {
                this.title = options.title;
                this.message = options.message;
                this.modalService.open(this.modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
                    options.result.next(true);
                    //console.log(`Closed with: ${result}`);
                }, (reason) => {
                    options.result.next(false);
                    //console.log(`Dismissed ${reason}`);
                })
            }
        })
    }

    ngOnInit(): void {
    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            alert(`Closed with: ${result}`);
        }, (reason) => {
            alert(`Dismissed ${reason}`);
        });
    }
}
