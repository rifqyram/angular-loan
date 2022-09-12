import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {InstalmentTypeModule} from "./instalment-type/instalment-type.module";
import {LoanTypeModule} from "./loan-type/loan-type.module";
import {SettingModule} from "./setting/setting.module";
import {TransactionModule} from "./transaction/transaction.module";
import { AdminPagesComponent } from './admin-pages.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        AdminPagesComponent
    ],
    exports: [
        AdminPagesComponent
    ],
    imports: [
        CommonModule,
        AdminPagesRoutingModule,
        InstalmentTypeModule,
        LoanTypeModule,
        SettingModule,
        TransactionModule,
        SharedModule
    ]
})
export class AdminPagesModule {
}
