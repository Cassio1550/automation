import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { FormsModule } from '@angular/forms';
import { CustomFieldModule } from '../custom-field/custom-field.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [TeamComponent, EditTeamComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomFieldModule,
        RouterModule,
    ]
})
export class TeamModule { }
