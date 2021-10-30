import { Component, OnInit } from '@angular/core';
import { User, Account } from './models';
import { UserService, AccountService } from './services';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleType } from '@app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
    title = 'Cars';
    user: Account | undefined;
    isLoggedIn: boolean = false;    
    showAppNavBar: boolean;    
    portal: string = '';
    role: RoleType | undefined;
    roleAdmin: RoleType = RoleType.Admin;
    roleUser: RoleType = RoleType.User;

    constructor(
      private userService: UserService,
      private accountService: AccountService,
      private router: Router
    ) 
    {   
      this.user = this.userService.lastUserValue;
      this.showAppNavBar = true;
      this.userService.userValue.subscribe(u => {
        this.isLoggedIn = true;
        this.user = u;
        this.role = this.userService.currRole;
      })      
    }    

    updateAccountInfo(account: Account | undefined) {
      this.user = account;
    }

    setAdmin(){
      this.router.navigate(['/admin']);
      this.role = RoleType.Admin;
      this.userService.currRoleType = this.role;
      this.portal = '/admin';
    }

    setUser(){
      this.router.navigate(['/']);
      this.role = RoleType.User;
      this.userService.currRoleType = this.role;
      this.portal = '';
    }

    logout() {
      this.userService.logout().subscribe(() => this.router.navigate([`${this.portal}/account/login`]));
      this.setUser();
      this.isLoggedIn = false;  
    }
}
