import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerPagesComponent} from './customer-pages.component';
import {SharedModule} from "../shared/shared.module";
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {LoanModule} from "./loan/loan.module";
import {CustomerPagesRoutingModule} from "./customer-pages-routing.module";
import {ProfileSettingModule} from "./profile-setting/profile-setting.module";


@NgModule({
  declarations: [
    CustomerPagesComponent,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoanModule,
    CustomerPagesRoutingModule,
    ProfileSettingModule
  ],
})
export class CustomerPagesModule {
}
