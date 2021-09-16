import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {Observable} from "rxjs";
import {PostModel} from "../model/post.model";


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  socket = io('ws://localhost:8081/feed');

  connect(): Observable<PostModel[]> {
    return new Observable<PostModel[]>(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('feed:initialization', (recentPosts: PostModel[]) => {
          observer.next(recentPosts);
        });
      });
    });
  }

  uploadNewPost(newPost: PostModel) {
    this.socket.emit('feed:new-post', newPost);
  }
}
