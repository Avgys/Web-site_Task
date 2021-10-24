import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from '@app/_modules/adminAccount/admin-routing.module';
import { LayoutComponent } from '@app/_modules/adminAccount/layout.component';
import { LoginComponent } from '@app/_modules/adminAccount/login.component';
import { RegisterComponent } from '@app/_modules/adminAccount/register.component';

@NgModule({
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  declarations:[
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AdminModule { }
