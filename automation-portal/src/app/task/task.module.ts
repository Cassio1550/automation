import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualReportComponent } from './report/manual-report/manual-report.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations: [ManualReportComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PipesModule,
    ]
})
export class TaskModule { }
