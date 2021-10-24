import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminModule } from '@app/_modules/adminAccount/admin.module';
import { OrderListComponent } from './orderList.component'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        AdminModule
    ],
    declarations: [
        OrderListComponent,
        // AddEditComponent
    ]
})
export class AdminMo { }