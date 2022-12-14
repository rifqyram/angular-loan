import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanTypeComponent } from './loan-type.component';
import {HttpClientModule} from "@angular/common/http";
import { LoanTypeListComponent } from './components/loan-type-list/loan-type-list.component';
import { LoanTypeFormComponent } from './components/loan-type-form/loan-type-form.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoanTypeRoutingModule} from "./loan-type-routing.module";
import {Title} from "@angular/platform-browser";



@NgModule({
  declarations: [
    LoanTypeComponent,
    LoanTypeListComponent,
    LoanTypeFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    LoanTypeRoutingModule
  ],
})
export class LoanTypeModule { }
