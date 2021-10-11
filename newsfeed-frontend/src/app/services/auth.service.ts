import { Injectable } from '@angular/core';
import { AuthStore } from "../stores/auth.store";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loggedInUser: User | null = null;
  redirectUrl: string | null = null;

  constructor(private authStore: AuthStore) {
    this.onInit()
  }

  private onInit() {
  }

  login(username: string, password: string) {
    let user;
    try {
      user = this.authStore.findUserByName(username);
    } catch (error) {
      console.error(error);
      return;
    }
    if (!(user.password === password)) {
      return;
    }
    this.isLoggedIn = true;
    this.loggedInUser = user;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }
}
