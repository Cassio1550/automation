import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilterPipe } from './list-filter.pipe';



@NgModule({
    declarations: [
        ListFilterPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ListFilterPipe
    ]
})
export class PipesModule { }
