import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart } from '@angular/router';

import { AccountService } from '../services';
import { UserService } from '@app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let result = false;
        this.userService.userValue.subscribe((user) =>{       
            if (user !== undefined) {
                result = true;
            }
            else
            {
                this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
                result = false;
            }
        })
        return result;
    }
}