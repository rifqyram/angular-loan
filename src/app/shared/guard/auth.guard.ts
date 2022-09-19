import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthService} from "../../auth/service/auth.service";
import {LoginResponse, Role} from "../../auth/model/IAuth";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private readonly router: Router, private readonly service: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }

  authorize(): Observable<boolean> {
    const user: LoginResponse | null = this.service.getUserFromStorage();

    if (user && user.token) {
      return this.service.getUserFromToken().pipe(map(({data}) => {
          if (data) return true;
          this.router.navigateByUrl('/login').then();
          return false;
        }),
        catchError((err) => {
          this.service.clearStorage();
          this.router.navigateByUrl('/login').then();
          Swal.fire({
            icon: 'info',
            title: 'Your session end',
            text: 'Please login again'
          }).then();
          return of(false);
        })
      )
    }

    this.router.navigateByUrl('/login').then();
    return of(false);
  }

}
