import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  // socket = io('ws://localhost:8081/feed');
  //
  // initializeFeed(): Observable<Post[]> {
  //   return new Observable<Post[]>(observer => {
  //     this.socket.on('connect', () => {
  //       console.log(`Socket Id: ${ this.socket.id }`);
  //       this.socket.emit('feed:initialization');
  //     });
  //     this.socket.on('feed:all-posts', (posts: Post[]) => {
  //       observer.next(posts);
  //     });
  //   });
  // }
  //
  // addCreateEventListener() {
  //   return new Observable<Post>(observer => {
  //     this.socket.on('post:created', (post: Post) => {
  //       observer.next(post);
  //     });
  //   });
  // }
  //
  // addUpdateEventListener() {
  //   return new Observable<Post>(observer => {
  //     this.socket.on('post:updated', (post: Post) => {
  //       observer.next(post);
  //     });
  //   });
  // }
  //
  // addDeleteEventListener() {
  //   return new Observable<string>(observer => {
  //     this.socket.on('post:deleted', (postId: string) => {
  //       if (postId) {
  //         observer.next(postId);
  //       }
  //     });
  //   });
  // }
  //
  // createPost(post: Post) {
  //   this.socket.emit('post:create', post);
  // }
  //
  // updatePost(userId: string, post: Post) {
  //   this.socket.emit('post:update', { userId: userId, post: post });
  // }
  //
  // deletePost(userId: string, postId: string) {
  //   this.socket.emit('post:delete', { userId: userId, postId: postId });
  // }

}
