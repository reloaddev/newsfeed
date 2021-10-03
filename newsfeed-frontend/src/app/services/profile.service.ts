import { Injectable } from '@angular/core';
import { Profile } from "../model/profile.model";
import { io } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  socket = io('ws://localhost:8082/profile')

  constructor() { }

  connect(userId: string): Observable<Profile> {
    return new Observable<Profile>(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('profile:get', userId);
      });
      this.socket.on('profile:loaded', (profile: Profile) => {
        observer.next(profile);
      });
      this.socket.on('profile:not-found', () => {
        observer.next(undefined);
      });
      this.socket.on('profile:created', (profile: Profile) => {
        observer.next(profile);
      });
      this.socket.on('profile:updated', (profile: Profile) => {
        observer.next(profile);
      });
    });
  }

  createProfile(profile: Profile) {
    this.socket.emit('profile:create', profile);
  }

  updateProfile(profile: Profile) {
    this.socket.emit('profile:update', profile);
  }
}
