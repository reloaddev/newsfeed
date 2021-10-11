import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {

  posts: Post[] = [];
  pictureDictionary: { [userId: string] : string } = {}
  newPostsAvailable = false;
  @ViewChild('feedSection') feedSection!: ElementRef;
  lastRoute: string = '';
  lastPosition: string = '';

  constructor(public dialog: MatDialog,
              private router: Router,
              private feedService: FeedService,
              private authService: AuthService,
              private profileService: ProfileService,
              private dateSort: DateSortPipe
  ) {}

  ngOnInit() {
    this.feedService.connect().subscribe(posts => {
      this.insertPosts(posts);
    });
    this.profileService.getProfilePictures().subscribe((pictureDictionary => {
      this.pictureDictionary = pictureDictionary;
    }));
    this.router.events.pipe(
      filter((events) => events instanceof NavigationStart || events instanceof NavigationEnd)
    ).subscribe(event => {
        if (event instanceof NavigationStart && event.url !== this.lastRoute) {
          this.lastRoute = this.router.url
          this.lastPosition = this.feedSection.nativeElement.scrollTop
        }
        else if (event instanceof NavigationEnd && event.url === this.lastRoute) {
          this.feedSection.nativeElement.scrollTo({ top: this.lastPosition })
        }
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.feedSection.nativeElement.scrollTop = -this.feedSection.nativeElement.scrollHeight;
    }, 1000);
  }

  isCurrentPostAuthor(post: Post): boolean {
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
        let userId = this.authService.loggedInUser?.userId;
        this.feedService.updatePost(userId as string, postWithComments);
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
        let userId = this.authService.loggedInUser?.userId;
        this.feedService.updatePost(userId as string, post);
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
        let userId = this.authService.loggedInUser?.userId;
        this.feedService.deletePost(userId as string, post.id).then(postId => {
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
    const filteredNewPosts = this.filterDuplicatePosts(this.posts, newPosts)
    if (filteredNewPosts.length > 0) {
      this.newPostsAvailable = true;
      this.posts.push(...filteredNewPosts);
      this.posts = this.dateSort.transform(this.posts) as Post[];
    }
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
