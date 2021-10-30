import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@app/modules/adminAccount/layout.component';
import { LoginComponent } from '@app/modules/adminAccount/login.component';
import { UserListComponent } from '@app/modules/adminAccount/userList.component';
import { HomeComponent } from '@app/pages/home';

const routes: Routes = [
    
    { path: '', component: HomeComponent },
    { path: 'users', component: UserListComponent },
    {
        path: 'account', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]        
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }