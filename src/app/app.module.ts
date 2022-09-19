import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {AdminPagesModule} from "./admin-pages/admin-pages.module";
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import {CustomerPagesModule} from "./customer-pages/customer-pages.module";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    AdminPagesModule,
    CustomerPagesModule,
    AuthModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
