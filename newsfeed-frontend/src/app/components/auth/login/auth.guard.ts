import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // constructor(private authService: AuthService,
  //             private router: Router) {
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // const url: string = state.url;
    // return this.checkLogin(url);
    return true; // TODO enable guard
  }

  // checkLogin(url: string): true | UrlTree {
  //   // if (this.cookieService.get('user')) { return true; }
  //   // if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   // this.authService.redirectUrl = url;

  //   // Redirect to the login page
  //   return this.router.parseUrl('/auth');
  // }

}
