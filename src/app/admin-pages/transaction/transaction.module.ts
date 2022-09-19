import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionComponent} from './transaction.component';
import {HttpClientModule} from "@angular/common/http";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {defaultSimpleModalOptions, SimpleModalModule} from "ngx-simple-modal";
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import {TransactionRoutingModule} from "./transaction-routing.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    TransactionComponent,
    TransactionListComponent,
    TransactionDetailComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        SweetAlert2Module,
        SimpleModalModule.forRoot({container: document.body}, {...defaultSimpleModalOptions, animationDuration: 200}),
        TransactionRoutingModule,
        NgxPaginationModule
    ]
})
export class TransactionModule {
}
