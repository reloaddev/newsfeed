import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedService } from "../../services/feed.service";
import { MatDialog } from "@angular/material/dialog";
import { PostCreationDialogComponent } from "./post-creation-dialog/post-creation-dialog.component";
import { Post } from "../../model/post.model";
import { isEqual, isNil } from "lodash";
import { PostCommentDialogComponent } from "./post-comment-dialog/post-comment-dialog.component";
import { Comment } from "../../model/comment.model";
import { DateSortPipe } from "../../pipes/date-sort.pipe";
import { Profile } from "../../model/profile.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];

  constructor(public dialog: MatDialog,
              private readonly feedService: FeedService,
              private readonly dateSort: DateSortPipe) {
  }

  ngOnInit(): void {
    this.feedService.connect().subscribe(posts => {
      this.insertPosts(posts);
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((createdPost: Post) => {
      if (createdPost && createdPost.text.length > 0) {
        this.feedService.uploadPost(createdPost);
      }
    })
  }

  openCommentDialog(post: Post) {
    const dialogRef = this.dialog.open(PostCommentDialogComponent, {
      width: '70rem',
      height: '50rem',
      data: post
    });
    dialogRef.afterClosed().subscribe((postWithComments: Post) => {
      if (postWithComments) {
        this.feedService.updatePost(postWithComments);
      }
    });
  }

  private insertPosts(newPosts: Post[]) {
    if (this.posts.length === 0) {
      this.posts.push(...newPosts);
      this.posts = this.dateSort.transform(this.posts) as Post[];
      return;
    }
    this.posts.push(...this.filterDuplicatePosts(this.posts, newPosts));
    this.posts = this.dateSort.transform(this.posts) as Post[];
  }

  private filterDuplicatePosts(posts: Post[], comparePosts: Post[]): Post[] {
    comparePosts.forEach(comparePost => {
      posts.forEach(post => {
        if (post.id === comparePost.id) {
          if (post.comments!.length < comparePost.comments!.length) {
            this.posts = this.posts.filter((p: Post) => p !== post);
            this.posts.push(comparePost);
          }
          comparePosts = comparePosts.filter(p => p !== comparePost);
        }
      });
    });
    return comparePosts;
  }
}
