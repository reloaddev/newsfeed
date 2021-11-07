import { Injectable } from '@angular/core';
import { Profile } from "../model/profile.model";
import { io } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  socket = io('ws://localhost:8082/profile')

  loadProfile(userId: string): Observable<Profile> {
    return new Observable<Profile>(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('profile:get', userId);
      });
      this.socket.on('profile:loaded', (profile: Profile) => {
        if (profile) {
          observer.next(profile);
        }
      });
    });
  }

  createProfile(profile: Profile) {
    this.socket.emit('profile:create', profile);
  }

  updateProfile(profile: Profile) {
    this.socket.emit('profile:update', profile);
  }

  deleteProfile(userId: string) {
    this.socket.emit('profile:delete', userId);
  }

  addCreateEventListener(): Observable<Profile> {
    return new Observable<Profile>(observer => {
      this.socket.on('profile:created', (profile: Profile) => {
        if (profile) {
          observer.next(profile);
        }
      });
    });
  }

  addUpdateEventListener(): Observable<Profile> {
    return new Observable<Profile>(observer => {
      this.socket.on('profile:updated', (profile: Profile) => {
        if (profile) {
          observer.next(profile);
        }
      });
    });
  }

  addNotFoundEventListener(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.socket.on('profile:not-found', () => {
        observer.next(true);
      });
    });
  }

  addPictureEventListener(): Observable<{ [userId: string]: string }> {
    this.socket.emit('profile:get-pictures');
    return new Observable<{ [userId: string]: string }>(observer => {
      this.socket.on('profile:pictures', (
        pictureDictionary: { [userId: string]: string }) => {
        observer.next(pictureDictionary);
      });
    })
  }
}
