import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileSettingComponent} from "./profile-setting.component";
import {MyDocumentComponent} from "./components/my-document/my-document.component";
import {UserProfileFormComponent} from "./components/user-profile-form/user-profile-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProfileSettingRoutingModule} from "./profile-setting-routing.module";
import {CustomerPagesModule} from "../customer-pages.module";
import {SidenavSettingComponent} from "./components/sidenav-setting/sidenav-setting.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProfileSettingComponent,
    MyDocumentComponent,
    UserProfileFormComponent,
    SidenavSettingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ProfileSettingRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileSettingModule { }
