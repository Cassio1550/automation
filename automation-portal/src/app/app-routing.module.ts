import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { CustomFieldComponent } from './custom-field/custom-field/custom-field.component';
import { EditCustomFieldComponent } from './custom-field/edit-custom-field/edit-custom-field.component';
import { CustomerModule } from './customer/customer.module';
import { CustomerComponent } from './customer/customer/customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { DeviceTypeComponent } from './device-type/device-type/device-type.component';
import { EditDeviceTypeComponent } from './device-type/edit-device-type/edit-device-type.component';
import { DeviceComponent } from './device/device/device.component';
import { EditDeviceComponent } from './device/edit-device/edit-device.component';
import { HomeComponent } from './home/home.component';
import { EditManagedObjectComponent } from './managed-object/edit-managed-object/edit-managed-object.component';
import { ManagedObjectComponent } from './managed-object/managed-object/managed-object.component';
import { EditRuleComponent } from './rule/edit-rule/edit-rule.component';
import { RuleComponent } from './rule/rule/rule.component';
import { EditSiteComponent } from './site/edit-site/edit-site.component';
import { SiteComponent } from './site/site/site.component';
import { ManualReportComponent } from './task/report/manual-report/manual-report.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { TeamComponent } from './team/team/team.component';
import { AuthGuard } from './_helper/auth.guard';
import { Role } from './_helper/Role';

const routes: Routes = [
    { path: 'state', component: HomeComponent },
    { path: 'code', component: HomeComponent },
    { path: '', component: HomeComponent },

    { path: 'customer', component: CustomerComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'customer/:id', component: EditCustomerComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'device', component: DeviceComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'device/:id', component: EditDeviceComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'rule', component: RuleComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'rule/:id', component: EditRuleComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'site', component: SiteComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'site/:id', component: EditSiteComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'team', component: TeamComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'team/:id', component: EditTeamComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'managedobject', component: ManagedObjectComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'managedobject/:id', component: EditManagedObjectComponent, canActivate: [MsalGuard, AuthGuard] },
    { path: 'manual-report', component: ManualReportComponent, canActivate: [MsalGuard, AuthGuard] },

    { path: 'customfield', component: CustomFieldComponent, canActivate: [MsalGuard, AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'customfield/:id', component: EditCustomFieldComponent, canActivate: [MsalGuard, AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'devicetype', component: DeviceTypeComponent, canActivate: [MsalGuard, AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'devicetype/:id', component: EditDeviceTypeComponent, canActivate: [MsalGuard, AuthGuard], data: { roles: [Role.Admin] } },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CustomerModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
