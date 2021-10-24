import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_pages/home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('@app/_modules/userAccount/account.module').then(x => x.AccountModule);
// const usersModule = () => import('@modules/user/users.module').then(x => x.UsersModule);
const adminModule = () => import('@app/_modules/adminAccount/admin.module').then(x => x.AdminModule);

const routes: Routes = [
    { path: '', component: HomeComponent},
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren:  adminModule},

    // { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
