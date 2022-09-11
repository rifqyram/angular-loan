import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InstalmentTypeComponent} from './instalment-type.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstalmentTypeListComponent} from './components/instalment-type-list/instalment-type-list.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    InstalmentTypeComponent,
    InstalmentTypeListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InstalmentTypeModule {
}
