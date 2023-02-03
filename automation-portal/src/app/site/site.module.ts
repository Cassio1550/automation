import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site/site.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { FormsModule } from '@angular/forms';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [SiteComponent, EditSiteComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomFieldModule,
        RouterModule,
    ]
})
export class SiteModule { }
