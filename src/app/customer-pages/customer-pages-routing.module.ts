import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerPagesComponent} from "./customer-pages.component";
import {AuthGuard} from "../shared/guard/auth.guard";
import {CustomerGuard} from "../shared/guard/customer.guard";
import {LoanComponent} from "./loan/loan.component";
import {AboutComponent} from "./about/about.component";
import {ProfileSettingComponent} from "./profile-setting/profile-setting.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerPagesComponent,
    canActivate: [AuthGuard, CustomerGuard],
    canActivateChild: [AuthGuard, CustomerGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'loan', component: LoanComponent},
      {path: 'about', component: AboutComponent},
      {path: 'profile-setting', component: ProfileSettingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPagesRoutingModule {
}
