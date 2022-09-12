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
import {Role} from "../../auth/model/IAuth";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router, private readonly service: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorized();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorized();
  }

  private authorized(): Observable<boolean> {
    let user = this.service.getUserFromStorage();

    if (user && user.token) {
      return this.service.getUserFromToken().pipe(
        map(({data}): boolean => {
          if (data.role === Role.ADMIN) {
            return true;
          }

          this.router.navigateByUrl('/').then();
          return false;
        }),
        catchError((err) => {
          this.service.clearStorage();
          this.router.navigateByUrl('/login').then();
          return of(false);
        })
      );
    }

    this.router.navigateByUrl('/login').then();
    return of(false);
  }
}
