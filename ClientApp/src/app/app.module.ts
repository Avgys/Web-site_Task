import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';
import { AlertComponent } from './components/alert';
import { CarRentalPointModule } from '@app/modules/car-rental/car-rental.module';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarRentalPointModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
