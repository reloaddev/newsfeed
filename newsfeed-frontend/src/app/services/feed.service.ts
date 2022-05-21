import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { FirestorePost } from './../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private store: Firestore) { }

  createPost(post: Post) {
    const postCollection = collection(this.store, 'posts');
    addDoc(postCollection, post);
  }

  queryPosts(): Observable<Post[]> {
    const postCollection = collection(this.store, 'posts');
    return (collectionData(postCollection) as Observable<FirestorePost[]>).pipe(
      map(firePosts => firePosts.map(firePost => {
        return ({ id: firePost.id, userId: firePost.userId, text: firePost.text, date: firePost.date?.toDate(), comments: firePost.comments } as Post)
      }))
    )
  }
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
  // updatePost(userId: string, post: Post) {
  //   this.socket.emit('post:update', { userId: userId, post: post });
  // }
  //
  // deletePost(userId: string, postId: string) {
  //   this.socket.emit('post:delete', { userId: userId, postId: postId });
  // }

}
