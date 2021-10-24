import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart } from '@angular/router';

import { AccountService } from '../_services';
import { UserService } from '@services/.';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
               
        // console.log("Auth");
        let result = false;
        this.userService.userValue.subscribe((user) =>{
        // const user = this.accountService.guest;
        // console.log(user.login);
            // console.log(user);        
            if (user !== undefined) {
                // authorised so return true
                // alert("authenticated");
                result = true;
            }
            else
            {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
                result = false;
            }
        })
        return result;
    }
}