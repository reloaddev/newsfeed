import { Injectable } from '@angular/core';
import { AuthStore } from "./auth.store";
import { User } from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loggedInUser: User | null = null;
  redirectUrl: string | null = null;

  constructor(private authStore: AuthStore) {
  }

  login(username: string, password: string) {
    let user;
    try {
      user = this.authStore.findUserByName(username);
    } catch (err) {
      this.isLoggedIn = false;
      return;
    }
    if (!(user.password === password)) {
      this.isLoggedIn = false;
      return;
    }
    this.isLoggedIn = true;
    this.loggedInUser = user;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
