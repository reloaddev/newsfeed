import { Component, OnInit } from '@angular/core';
import { FeedService } from "../services/feed.service";
import { MatDialog } from "@angular/material/dialog";
import { PostCreationDialogComponent } from "./post-creation-dialog/post-creation-dialog.component";
import { Post } from "../model/post";
import { isEqual } from "lodash";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];

  constructor(public dialog: MatDialog,
              private feedService: FeedService) {
  }

  ngOnInit(): void {
    this.feedService.connect().subscribe(posts => this.insertNewPosts(posts));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((createdPost: Post) => {
      if (createdPost && createdPost.text.length > 0) {
        this.feedService.uploadNewPost(createdPost);
      }
    })
  }

  private insertNewPosts(newPosts: Post[]) {
    if (this.posts.length === 0) {
      this.posts.push(...newPosts);
      return;
    }
    this.posts.push(...FeedComponent.filterDuplicatePosts(this.posts, newPosts));
  }

  private static filterDuplicatePosts(posts: Post[], comparePosts: Post[]): Post[] {
    comparePosts.forEach(comparePost => {
      posts.forEach(post => {
        if (isEqual(post, comparePost)) {
          comparePosts = comparePosts.filter(post => post !== comparePost);
        }
      });
    });
    return comparePosts;
  }
}
