import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AccountModule } from '@app/_modules/userAccount/account.module';
import { OrderListComponent } from './orderList.component'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        AccountModule
    ],
    declarations: [
        OrderListComponent,
        // AddEditComponent
    ]
})
export class UsersModule { }