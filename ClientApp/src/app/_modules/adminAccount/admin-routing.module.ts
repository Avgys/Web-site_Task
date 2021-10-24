import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@app/_modules/adminAccount/layout.component';
import { LoginComponent } from '@app/_modules/adminAccount/login.component';
import { RegisterComponent } from '@app/_modules/adminAccount/register.component';
import { HomeComponent } from '@app/_pages/home';

const routes: Routes = [
    
    { path: '', component: HomeComponent },
    {
        path: 'account', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }