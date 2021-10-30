import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/services';
import { User } from '@app/models';

@Component({ templateUrl: 'userList.component.html' })
export class UserListComponent implements OnInit {
    users?: User[];

    constructor(private userService: UserService) {
       this.users = [];
    }

    ngOnInit() {
        this.userService.getUsers(10, 0)
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}