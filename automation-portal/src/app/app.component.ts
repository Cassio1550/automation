//import { MsalService, BroadcastService } from '@azure/msal-angular';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EventMessage, EventType, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthorizationService } from './_services/authorization.service';

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'automation-portal';
    isIframe = false;
    loggedIn = false;
    private readonly _destroying$ = new Subject<void>();
    username: string | undefined;
    roles: string[] = [];

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private authService: MsalService,
        private msalBroadcastService: MsalBroadcastService,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener;

        this.checkAccount();

        this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
                takeUntil(this._destroying$)
            )
            .subscribe((result) => {
                this.checkAccount();
            });
    }

    checkAccount() {
        let accounts = this.authService.instance.getAllAccounts();
        this.loggedIn = accounts.length > 0;
        if(this.loggedIn) {
            this.username = accounts[0].name;
            this.roles = (accounts[0].idTokenClaims as any)?.roles;
        }
    }

    login() {
        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            if (this.msalGuardConfig.authRequest) {
                this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
                    .subscribe(() => this.checkAccount());
            } else {
                this.authService.loginPopup()
                    .subscribe(() => this.checkAccount());
            }
        } else {
            if (this.msalGuardConfig.authRequest) {
                this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
            } else {
                this.authService.loginRedirect();
            }
        }
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }
}
