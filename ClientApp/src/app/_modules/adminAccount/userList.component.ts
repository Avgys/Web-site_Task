import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@services/.';
import { User } from '@app/_models';

@Component({ templateUrl: 'userList.component.html' })
export class UserListComponent implements OnInit {
    users?: User[];

    constructor(private userService: UserService) {
       this.users = [];
    }

    ngOnInit() {
        this.userService.getUsers(0, 10)
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}