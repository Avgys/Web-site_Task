import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { UserLoginComponent } from './_pages/user-login/user-login.component';
import { HomeComponent } from './_pages/home';
// import { UserRegisterComponent } from './_pages/user-register/user-register.component';
// import { AlertComponent } from './_components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent
    // UserLoginComponent,
    // UserRegisterComponent,
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
