import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from '@app/_modules/Account/account.module';

import { AccountRoutingModule } from '@modules/Account/account-routing.module';
import { LayoutComponent } from '@modules/Account/layout.component';
import { LoginComponent } from '@modules/Account/login.component';
import { RegisterComponent } from '@modules/Account/register.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    AccountModule
  ],
  declarations:[

  ]
})
export class AdminModule { }
