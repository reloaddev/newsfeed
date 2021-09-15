import {Injectable} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {io} from "socket.io-client";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  socket = io('ws://localhost:8081/feed');
  posts: string[] = [];

  connect(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('feed:initialization', (recentPosts: string[]) => {
          observer.next(recentPosts);
        });
      });
    });
  }

  uploadNewPost(newPost: string) {
    this.socket.emit('feed:new-post', newPost, (confirmation: string) => {
      console.log(confirmation);
    });
  }
}
