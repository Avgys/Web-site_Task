import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart } from '@angular/router';

import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user.Name != this.accountService.guest.Name) {
            // authorised so return true
            return true;
        }
        else
        {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}