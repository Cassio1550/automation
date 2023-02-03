import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { MsalModule, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { auth } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { RuleModule } from './rule/rule.module';
import { CustomFieldModule } from './custom-field/custom-field.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingComponent } from './loading/loading.component';
import { DeviceModule } from './device/device.module';
import { DeviceTypeModule } from './device-type/device-type.module';
import { TeamModule } from './team/team.module';
import { SiteModule } from './site/site.module';
import { ManagedObjectModule } from './managed-object/managed-object.module';
import { PipesModule } from './pipes/pipes.module';
import { TaskModule } from './task/task.module';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
      auth: {
        clientId: auth.credentials.clientId,
        authority: 'https://login.microsoftonline.com/' + auth.credentials.tenantId,
        redirectUri: window.location.protocol + "//" + window.location.host
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    });
  }

  export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set(auth.resources.todoListApi.resourceUri, auth.resources.todoListApi.resourceScopes);

    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap
    };
  }

  export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return { interactionType: InteractionType.Redirect };
  }

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ToastComponent,
        ConfirmComponent,
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomerModule,
        RuleModule,
        CustomFieldModule,
        DeviceModule,
        DeviceTypeModule,
        TeamModule,
        SiteModule,
        TaskModule,
        ManagedObjectModule,
        HttpClientModule,
        MsalModule,
        NgbModule,
        PipesModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
