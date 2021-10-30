import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { AuthGuard } from './helpers';

const accountModule = () => import('@app/modules/userAccount/account.module').then(x => x.AccountModule);
const adminModule = () => import('@app/modules/adminAccount/admin.module').then(x => x.AdminModule);
const rentalModule = () => import('@app/modules/car-rental/car-rental.module').then(x => x.CarRentalPointModule);

const routes: Routes = [
    { path: '', component: HomeComponent}, // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule},    
    { path: 'rental', loadChildren: rentalModule},

    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
