import { Component } from '@angular/core';
import { User } from './_models';
import { AccountService } from './_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cars';
  user?: User;

    constructor(
      private accountService: AccountService,
      private router: Router) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout().subscribe(() => this.router.navigate(['/account/login']));
    }
}
