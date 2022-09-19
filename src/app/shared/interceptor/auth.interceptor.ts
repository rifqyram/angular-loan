import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AuthService} from "../../auth/service/auth.service";
import {LoadingService} from "../service/loading.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly service: AuthService, private readonly loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.service.getUserFromStorage();
    const isLogin = currentUser && currentUser.token;

    this.loadingService.show();

    if (isLogin) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request).pipe(finalize(() => this.loadingService.hide()));
  }
}
