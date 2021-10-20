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
               
        // console.log("Auth");
        let result = false;
        this.accountService.userValue.subscribe((user) =>{
        // const user = this.accountService.guest;
        // console.log(user.login);
            if (user.login != this.accountService.guest.login) {
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
         }
        )
        return result;

        // let user = this.accountService.userValue.subscribe();
       
        // console.log(user);
        // if (user.login != this.accountService.guest.login) {
        //     // authorised so return true
        //     // alert("authenticated");
        //     return true;
        // }
        // else
        // {
        //     // not logged in so redirect to login page with the return url
        //     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        //     return false;
        // }
    }
}