import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {InstalmentTypeModule} from "./instalment-type/instalment-type.module";
import {LoanTypeModule} from "./loan-type/loan-type.module";
import {SettingModule} from "./setting/setting.module";
import {TransactionModule} from "./transaction/transaction.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InstalmentTypeModule,
    LoanTypeModule,
    SettingModule,
    TransactionModule
  ]
})
export class PagesModule {
}
