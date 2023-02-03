import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthorizationService } from "../_services/authorization.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: MsalService,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let accounts = this.authService.instance.getAllAccounts();
        let loggedIn = accounts.length > 0;
        if (loggedIn) {
            return this.authorizationService.isAnyRole(route.data.roles);
        } else {
            return true;
        }
    }


}
