import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {Observable} from "rxjs";
import {Post} from "../model/post.model";


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  socket = io('ws://localhost:8081/feed');

  connect(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      this.socket.on('connect', () => {
        console.log(`Socket Id: ${this.socket.id}`);
        this.socket.emit('feed:initialization', (recentPosts: Post[]) => {
          observer.next(recentPosts);
        });
      });
      this.socket.on('feed:new-post', (post: Post) => {
        observer.next([post]);
      });
    });
  }

  uploadNewPost(newPost: Post) {
    this.socket.emit('feed:new-post', newPost);
  }

  updatePost(post: Post) {

  }
}
