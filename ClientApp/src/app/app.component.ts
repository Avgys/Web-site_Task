import { Component, OnInit } from '@angular/core';
import { User } from './_models';
import { UserService, AccountService } from './_services';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleType } from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Cars';
    user?: User;
    isLoggedIn: boolean = false;    
    showAppNavBar: boolean;    
    portal: string = "";
    role: RoleType = RoleType.User;
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
      this.setUser(); 
      this.userService.userValue.subscribe(u => {
        this.isLoggedIn = true;
        this.user = u;
      })      
    }

    ngOnInit(){  
        
    }
    
    public setAdmin(){
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
      this.setUser();
      this.isLoggedIn = false;  
    }
}
