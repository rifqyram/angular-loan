import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {LoginGuard} from "../shared/guard/login.guard";

const routes: Routes = [
  {path: 'login', canActivate: [LoginGuard], component: LoginFormComponent},
  {path: 'register', canActivate: [LoginGuard], component: RegisterFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
