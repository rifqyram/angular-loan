import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoanRequestFormComponent} from "./components/loan-request-form/loan-request-form.component";
import {LoanRequestListComponent} from "./components/loan-request-list/loan-request-list.component";
import {SharedModule} from "../../shared/shared.module";
import {LoanComponent} from "./loan.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';
import {LoanRoutingModule} from "./loan-routing.module";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";



@NgModule({
  declarations: [
    LoanComponent,
    LoanRequestFormComponent,
    LoanRequestListComponent,
    LoanDetailComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        SharedModule,
        LoanRoutingModule,
        SweetAlert2Module,
    ],
  exports: [LoanComponent]
})
export class LoanModule { }
