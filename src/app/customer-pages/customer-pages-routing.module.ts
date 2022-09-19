import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerPagesComponent} from "./customer-pages.component";
import {AuthGuard} from "../shared/guard/auth.guard";
import {CustomerGuard} from "../shared/guard/customer.guard";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerPagesComponent,
    canActivate: [AuthGuard, CustomerGuard],
    canActivateChild: [AuthGuard, CustomerGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: '', loadChildren: () => import('./loan/loan-routing.module').then(m => m.LoanRoutingModule)},
      {path: '', loadChildren: () => import('./profile-setting/profile-setting-routing.module').then(m => m.ProfileSettingRoutingModule)},
      {path: 'about', component: AboutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPagesRoutingModule {
}
