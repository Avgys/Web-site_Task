import { Component, OnInit } from '@angular/core';

import { User } from '../../_models';
import { AccountService } from '../../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        console.log(this.user);
    }

    ngOnInit() {        
        // this.user = this.accountService.userValue;
        console.log(this.user);
    }
}