import { Injectable } from '@angular/core';
import { AuthStore } from "./auth.store";
import { LoginStatus } from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authStore: AuthStore) {
  }

  login(username: string, password: string): LoginStatus {
    let user;
    try {
      user = this.authStore.findUserByName(username);
    } catch (err) {
      console.error(`Authentication ${err}`);
      return LoginStatus.NOT_FOUND;
    }
    if (!(user.password === password)) {
      return LoginStatus.WRONG_PASSWORD;
    }
    return LoginStatus.SUCCESSFUL;
  }

}
