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
        
        // let apiValue;
        // this.accountService.getUserInfo().subscribe(value => apiValue = value);
        // if (apiValue != null){
        //     user = apiValue;
        // }else{
            
        // }
        const user = this.accountService.getUserValue();
        if (user.login != this.accountService.guest.login) {
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