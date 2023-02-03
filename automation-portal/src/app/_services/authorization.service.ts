import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Role } from '../_helper/Role';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private roles: any;
    constructor(
        private authService: MsalService,
    ) {
        this.getRoles();
    }

    getRoles() {
        if (!this.roles) {
            let accounts = this.authService.instance.getAllAccounts();
            let loggedIn = accounts.length > 0;
            if (loggedIn) {
                this.roles = (accounts[0].idTokenClaims as any)?.roles;
            }
        }

        return this.roles;
    }

    isAdmin(): boolean {
        return this.isRole(Role.Admin);
    }

    isUser(): boolean {
        return this.isRole(Role.Admin) || this.isRole(Role.User);
    }

    isReadOnly(): boolean {
        return this.isRole(Role.Admin) || this.isRole(Role.User) || this.isRole(Role.Readonly);
    }

    isAnyRole(roles: any): boolean {
        if (this.isAdmin())
            return true;

        if (!roles)
            return true;

        for (let role of roles) {
            if (this.isRole(role))
                return true;
        }

        return false;
    }

    isRole(role: any): boolean {
        let roles = this.getRoles();
        if (roles)
            return roles.indexOf(role) > -1;
        return false;
    }
}
