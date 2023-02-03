import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleComponent } from './rule/rule.component';
import { EditRuleComponent } from './edit-rule/edit-rule.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations: [RuleComponent, EditRuleComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CustomFieldModule,
        PipesModule,
    ]
})
export class RuleModule { }
