import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileFormComponent} from "./components/user-profile-form/user-profile-form.component";
import {MyDocumentComponent} from "./components/my-document/my-document.component";
import {ProfileSettingComponent} from "./profile-setting.component";

const routes: Routes = [
  {
    path: 'setting',
    component: ProfileSettingComponent,
    children: [
      {path: '', component: UserProfileFormComponent},
      {path: 'document', component: MyDocumentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSettingRoutingModule {
}
