import { Component } from '@angular/core';
import { User } from './_models';
import { UserService, AccountService } from './_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Cars';
    user?: User;
    isLoggedIn: boolean = false;

    constructor(
      private userService: UserService,
      private accountService: AccountService,
      private router: Router
    ) 
    {
      this.accountService.getAccountInfo().subscribe(
        data => {
          this.isLoggedIn = true;
        }
      )
      this.userService.user.subscribe(x => this.user = x);
      this.router.navigate(['/']);
    }
    
    

    login(){
      this.router.navigate(['/account/login']);
    }

    logout() {
      this.userService.logout().subscribe(() => this.router.navigate(['/account/login']));
    }
}
