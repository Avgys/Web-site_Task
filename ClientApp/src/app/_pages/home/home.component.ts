import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models';
import { AccountService } from '../../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router
    )   
    {
        this.user = this.accountService.guest;               
    }

    ngOnInit() {        
        this.accountService.userValue.subscribe(x => 
            {
                this.user = x;
            }); 
            
    }
}