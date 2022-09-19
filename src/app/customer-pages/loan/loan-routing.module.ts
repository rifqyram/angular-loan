import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoanComponent} from "./loan.component";
import {LoanDetailComponent} from "./components/loan-detail/loan-detail.component";
import {LoanRequestListComponent} from "./components/loan-request-list/loan-request-list.component";
import {LoanRequestFormComponent} from "./components/loan-request-form/loan-request-form.component";

const routes: Routes = [
  {
    path: 'loan',
    component: LoanComponent,
    children: [
      {path: '', component: LoanRequestListComponent},
      {path: 'request', component: LoanRequestFormComponent},
      {path: 'detail/:id', component: LoanDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule {
}
