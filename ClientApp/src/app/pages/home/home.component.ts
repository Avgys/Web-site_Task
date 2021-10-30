import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models';
import { AccountService, UserService } from '@app/services/index';
import { AppComponent } from '@app/app.component';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User | undefined;

    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private appComponent: AppComponent
    )   
    {
        this.user = this.userService.lastUserValue;               
    }

    ngOnInit() {       
        this.userService.userValue.subscribe(u =>{
                this.user = u;
                this.appComponent.updateAccountInfo(u);
            }
        );           
    }
}