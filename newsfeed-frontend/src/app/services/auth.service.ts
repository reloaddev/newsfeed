import { Injectable } from '@angular/core';
import { AuthStore } from "../components/auth/auth.store";
import { User } from "../model/user.model";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loggedInUser: User | null = null;
  redirectUrl: string | null = null;

  constructor(private authStore: AuthStore,
              private cookieService: CookieService) {
    this.onInit()
  }

  private onInit() {
    try {
      this.loggedInUser = JSON.parse(this.cookieService.get('user'));
    } catch (err) {
      console.error(err);
    }
  }

  login(username: string, password: string) {
    let user;
    try {
      user = this.authStore.findUserByName(username);
    } catch (err) {
      return;
    }
    if (!(user.password === password)) {
      return;
    }
    this.isLoggedIn = true;
    this.loggedInUser = user;
    this.cookieService.set('user', JSON.stringify(user));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.cookieService.delete('user');
  }
}
