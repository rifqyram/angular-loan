import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DahsboardComponent} from "./dashboard/dahsboard.component";
import {InstalmentTypeComponent} from "./instalment-type/instalment-type.component";
import {LoanTypeComponent} from "./loan-type/loan-type.component";
import {AdminPagesComponent} from "./admin-pages.component";
import {AuthGuard} from "../shared/guard/auth.guard";
import {AdminGuard} from "../shared/guard/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
    children: [
      {path: 'dashboard', component: DahsboardComponent},
      {path: 'instalment-type', component: InstalmentTypeComponent},
      {path: 'loan-type', component: LoanTypeComponent},
      // {path: 'transaction',},
      // {path: 'setting',},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
