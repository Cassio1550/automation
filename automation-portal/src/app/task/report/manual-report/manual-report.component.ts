import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { TaskService } from '../../task.service';

@Component({
    selector: 'app-manual-report',
    templateUrl: './manual-report.component.html',
    styleUrls: ['./manual-report.component.scss']
})
export class ManualReportComponent implements OnInit {

    task!: any;
    newfield = "";
    extrafields = new Array<string>();

    constructor(
        private route: ActivatedRoute,
        private service: TaskService,
        private router: Router,
        public authorizationService: AuthorizationService,
    ) {
        this.init();
    }

    ngOnInit(): void {
    }

    init(): void {
        this.task = {
            "from": "now-24h",
            "to": "now",
            "theme": "light",
        };
    }

    run(event: MouseEvent): void {
        this.service.run(this.task).subscribe(() => {
            this.init();
        });
    }

    addField(event: MouseEvent): void {
        if (this.newfield.length > 0 && this.extrafields.indexOf(this.newfield) == -1) {
            this.extrafields.push(this.newfield);
            this.newfield = "";
        }
    }

    removeField(event: MouseEvent, fieldName: string): void {
        const index = this.extrafields.indexOf(fieldName);
        if (index > -1) {
            this.extrafields.splice(index, 1);

            if(this.task[fieldName]){
                delete this.task[fieldName];
            }
        }
    }
}
