import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@app/modules/car-rental/layout.component';
import { RouterModule } from '@angular/router';
import { CarRentalPointRoutingModule } from '@app/modules/car-rental/car-rental-routing.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CarRentalPointRoutingModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CarRentalPointModule { }
