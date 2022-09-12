import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPagesRoutingModule } from './customer-pages-routing.module';
import { CustomerPagesComponent } from './customer-pages.component';
import {SharedModule} from "../shared/shared.module";
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoanComponent } from './loan/loan.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import {CustomerService} from "./profile-setting/service/customer.service";


@NgModule({
  declarations: [
    CustomerPagesComponent,
    AboutComponent,
    HomeComponent,
    LoanComponent,
    ProfileSettingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerPagesRoutingModule
  ],
  providers: [CustomerService]
})
export class CustomerPagesModule { }
