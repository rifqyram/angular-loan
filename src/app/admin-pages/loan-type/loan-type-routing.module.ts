import {RouterModule, Routes} from "@angular/router";
import {LoanTypeComponent} from "./loan-type.component";
import {NgModule} from "@angular/core";
import {LoanTypeListComponent} from "./components/loan-type-list/loan-type-list.component";
import {LoanTypeFormComponent} from "./components/loan-type-form/loan-type-form.component";

const routes: Routes = [
  {
    path: '',
    component: LoanTypeComponent,
    children: [
      {
        path: 'loan-type',
        component: LoanTypeListComponent,
      },
      {
        path: 'loan-type/create',
        component: LoanTypeFormComponent
      },
      {
        path: 'loan-type/update/:id',
        component: LoanTypeFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanTypeRoutingModule {
}
