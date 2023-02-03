import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../_services/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    loading: boolean = false;
    constructor(
        public service: LoadingService
    ) { }

    ngOnInit(): void {
    }

}
