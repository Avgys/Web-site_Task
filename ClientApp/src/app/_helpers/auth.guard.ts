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
        // console.log(user.login);
        if (user.login != this.accountService.guest.login) {
            // authorised so return true
            // alert("authenticated");
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