import { Component } from '@angular/core';
import { User } from './_models';
import { UserService, AccountService } from './_services';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleType } from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Cars';
    user?: User;
    isLoggedIn: boolean = false;    
    showAppNavBar: boolean;    
    portal: string;
    role: RoleType;
    roleAdmin: RoleType = RoleType.Admin;
    roleUser: RoleType = RoleType.User;

    constructor(
      private userService: UserService,
      private accountService: AccountService,
      private router: Router
    ) 
    {   
      this.showAppNavBar = true;   
      this.userService.userValue.subscribe(
        data => {
          this.isLoggedIn = true;
        }
      )
      this.userService.user.subscribe(x => this.user = x);
      this.portal = "";
      this.role = this.roleUser;
      this.router.navigate(['/']);      
    }

    // public getRole(){
    //   return this.userService.currRole;
    // }
    
    setAdmin(){
      this.router.navigate(['/admin']);
      this.userService.currRole = RoleType.Admin;
      this.role = RoleType.Admin;
      this.portal = "/admin";
      // alert(RoleType.Admin.toString());
    }

    setUser(){
      this.router.navigate(['/']);
      this.userService.currRole = RoleType.User;
      this.role = RoleType.User;
      this.portal = "";
      // alert(RoleType.Admin.toString());
    }

    login(){
      this.router.navigate([`${this.portal}/account/login`]);      
      // this.router.navigate(['/account/login']);
    }

    logout() {
      this.userService.logout().subscribe(() => this.router.navigate([`${this.portal}/account/login`]));
    }
}
