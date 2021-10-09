import { Component, OnInit } from '@angular/core';
import { FeedService } from "../../services/feed.service";
import { MatDialog } from "@angular/material/dialog";
import { PostCreationDialogComponent } from "./post-creation-dialog/post-creation-dialog.component";
import { Post } from "../../model/post.model";
import { PostCommentDialogComponent } from "./post-comment-dialog/post-comment-dialog.component";
import { DateSortPipe } from "../../pipes/date-sort.pipe";
import { PostDeleteDialogComponent } from "./post-delete-dialog/post-delete-dialog.component";
import { AuthService } from "../../services/auth.service";
import { PostUpdateDialogComponent } from "./post-update-dialog/post-update-dialog.component";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];
  pictureDictionary: { [userId: string] : string } = {}

  constructor(public dialog: MatDialog,
              private feedService: FeedService,
              private authService: AuthService,
              private profileService: ProfileService,
              private dateSort: DateSortPipe
  ) {}

  ngOnInit(): void {
    this.feedService.connect().subscribe(posts => {
      this.insertPosts(posts);
    });
    this.profileService.getProfilePictures().subscribe((pictureDictionary => {
      this.pictureDictionary = pictureDictionary;
    }));
  }

  currentIsPostAuthor(post: Post): boolean {
    return this.authService.loggedInUser?.userId === post.userId;
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((createdPost: Post) => {
      if (createdPost && createdPost.text.length > 0) {
        this.feedService.createPost(createdPost);
      }
    });
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

  openUpdateDialog(post: Post) {
    const dialogRef = this.dialog.open(PostUpdateDialogComponent, {
      width: "70rem",
      height: "50rem",
      data: post
    });
    dialogRef.afterClosed().subscribe((updatedText: string) => {
      if (post.text !== updatedText) {
        post.text = updatedText
        this.feedService.updatePost(post);
      }
    });
  }

  openDeleteDialog(post: Post) {
    const dialogRef = this.dialog.open(PostDeleteDialogComponent, {
      width: '20rem',
      height: '9rem',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation && post.id) {
        this.feedService.deletePost(post.id).then(postId => {
            this.posts = this.posts.filter(post => post.id !== postId);
            this.posts = this.dateSort.transform(this.posts) as Post[];
          }
        );
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
