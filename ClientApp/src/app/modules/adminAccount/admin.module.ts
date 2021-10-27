import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from '@app/modules/adminAccount/admin-routing.module';
import { LayoutComponent } from '@app/modules/adminAccount/layout.component';
import { LoginComponent } from '@app/modules/adminAccount/login.component';
import { RegisterComponent } from '@app/modules/adminAccount/register.component';
import { UserListComponent } from '@app/modules/adminAccount/userList.component';


@NgModule({
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    AdminRoutingModule,
    CommonModule
  ],
  declarations:[
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent
  ]
})
export class AdminModule { }
