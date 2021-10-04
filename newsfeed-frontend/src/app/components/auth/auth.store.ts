import { Injectable } from "@angular/core";
import { User } from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  users: User[] = [
    { username: 'henrik', password: 'secret' },
    { username: 'test', password: 'pw123' },
    { username: 'production', password: 'prod' }
  ]

  constructor() {
  }

  findUserByName(username: string): User {
    const user = this.users.find(user => user.username === username);
    if (!user) {
      throw new Error(`User with username '${username}' not found!`);
    }
    return user;
  }

}
