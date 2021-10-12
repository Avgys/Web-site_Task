import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// // import { UserRegisterComponent } from './_pages/user-register/user-register.component';
import { HomeComponent } from './_pages/home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./_modules/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./_models/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
