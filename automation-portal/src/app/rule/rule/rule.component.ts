import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { Rule } from '../rule';
import { RuleService } from '../rule.service';

@Component({
    selector: 'app-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
    rules: Rule[] = [];
    searchTerm: string = '';
    constructor(
        private service: RuleService,
        private confirmService: ConfirmService,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((rules: Rule[]) => {
                this.rules = rules;
            });
    }

    delete(ruleId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar esta regra").subscribe(result => {
            if (result) {
                this.service.delete(ruleId).subscribe(() => {
                    this.load();
                });
            }
        });
    }

    download(ruleId: number): void {
        this.service.download(ruleId).subscribe(() => {
        });
    }

}
