import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {TransactionDetailComponent} from "./components/transaction-detail/transaction-detail.component";
import {TransactionComponent} from "./transaction.component";

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {path: 'transaction', component: TransactionListComponent},
      {path: 'transaction/detail/:id', component: TransactionDetailComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {
}
