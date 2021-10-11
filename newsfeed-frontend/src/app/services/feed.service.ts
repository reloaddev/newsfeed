import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from "rxjs";
import { Post } from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  socket = io('ws://localhost:8081/feed');

  connect(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      this.socket.on('connect', () => {
        console.log(`Socket Id: ${ this.socket.id }`);
        this.socket.emit('feed:initialization', (recentPosts: Post[]) => {
          observer.next(recentPosts);
        });
      });
      this.socket.on('post:created', (post: Post) => {
        observer.next([post]);
      });
      this.socket.on('post:updated', (post: Post) => {
        observer.next([post]);
      });
    });
  }

  createPost(post: Post) {
    this.socket.emit('post:create', post);
  }

  updatePost(userId: string, post: Post) {
    this.socket.emit('post:update', { userId: userId,post: post });
  }

  deletePost(postId: string): Promise<string> {
    this.socket.emit('post:delete', postId);
    return new Promise<string>((resolve) => {
      this.socket.on('post:deleted', (postId: string) => {
        if (postId) {
          resolve(postId);
        }
      });
    });
  }
}
