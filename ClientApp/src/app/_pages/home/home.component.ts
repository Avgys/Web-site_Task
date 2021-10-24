import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models';
import { AccountService, UserService } from '@services/index';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User | undefined;

    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    )   
    {
        this.user = this.userService.lastUserValue;               
    }

    ngOnInit() {       
        this.userService.userValue.subscribe(u =>
            this.user = u
        );           
    }
}