import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DahsboardComponent} from "./dahsboard.component";


@NgModule({
  declarations: [
    DahsboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DahsboardComponent]
})
export class DashboardModule {
}
