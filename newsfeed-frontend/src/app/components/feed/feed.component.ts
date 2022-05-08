import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PostCreationDialogComponent } from "./post-creation-dialog/post-creation-dialog.component";
import { Post } from "../../model/post.model";
import { PostCommentDialogComponent } from "./post-comment-dialog/post-comment-dialog.component";
import { DateSortPipe } from "../../pipes/date-sort.pipe";
import { DeleteDialogComponent } from "../shared/delete-dialog/delete-dialog.component";
import { AuthService } from "../../services/auth.service";
import { PostUpdateDialogComponent } from "./post-update-dialog/post-update-dialog.component";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {

  posts: Post[] = [];
  pictureDictionary: { [userId: string]: string } = {}
  newPostsAvailable = false;
  @ViewChild('feedSection') feedSection!: ElementRef;
  lastRoute: string = '';
  lastPosition: string = '';
  hasProfile: boolean = false;

  constructor(public dialog: MatDialog,
              private router: Router,
              // private feedService: FeedService,
              private authService: AuthService,
              // private profileService: ProfileService,
              private dateSort: DateSortPipe
  ) {
  }

  ngOnInit() {
    // this.feedService.initializeFeed().subscribe(posts => {
    //   this.initializeFeed(posts);
    // });
    this.addEventListeners();
    this.addProfileCheckListener();
    this.enableScrollPositionRestoration();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.feedSection.nativeElement.scrollTop = -this.feedSection.nativeElement.scrollHeight;
    }, 1000);
  }

  addEventListeners() {
    // this.feedService.addCreateEventListener().subscribe(post => {
    //   this.createPost(post);
    // });
    // this.feedService.addUpdateEventListener().subscribe(post => {
    //   this.updatePost(post);
    // });
    // this.feedService.addDeleteEventListener().subscribe(postId => {
    //   this.deletePost(postId);
    // });
    // this.profileService.addPictureEventListener().subscribe(pictureDictionary => {
    //   this.pictureDictionary = pictureDictionary;
    // });
  }

  addProfileCheckListener() {
    // this.profileService.loadProfile(this.authService.loggedInUser?.userId as string).subscribe(() => {
    //   this.hasProfile = true;
    // });
    // this.profileService.addCreateEventListener().subscribe(() => {
    //   this.hasProfile = true;
    // });
    // this.profileService.addNotFoundEventListener().subscribe(() => {
    //   this.hasProfile = false;
    // });
  }

  enableScrollPositionRestoration() {
    this.router.events.pipe(
      filter((events) => events instanceof NavigationStart || events instanceof NavigationEnd)
    ).subscribe(event => {
        if (event instanceof NavigationStart && event.url !== this.lastRoute) {
          this.lastRoute = this.router.url
          this.lastPosition = this.feedSection.nativeElement.scrollTop
        } else if (event instanceof NavigationEnd && event.url === this.lastRoute) {
          this.feedSection.nativeElement.scrollTo({ top: this.lastPosition })
        }
      }
    );
  }

  // isCurrentPostAuthor(post: Post): boolean {
  //   // return this.authService.loggedInUser?.userId === post.userId;
  // }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((createdPost: Post) => {
      if (createdPost && createdPost.text.length > 0) {
        // this.feedService.createPost(createdPost);
      }
    });
  }

  openCommentDialog(post: Post) {
    const dialogRef = this.dialog.open(PostCommentDialogComponent, {
      width: '70rem',
      height: '50rem',
      data: { post: post, hasProfile: this.hasProfile }
    });
    dialogRef.afterClosed().subscribe((postWithComments: Post) => {
      if (postWithComments) {
        // let userId = this.authService.loggedInUser?.userId;
        // this.feedService.updatePost(userId as string, postWithComments);
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
      if (updatedText && post.text !== updatedText) {
        post.text = updatedText
        // let userId = this.authService.loggedInUser?.userId;
        // this.feedService.updatePost(userId as string, post);
      }
    });
  }

  openDeleteDialog(post: Post) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '21rem',
      height: '9rem',
      autoFocus: false,
      data: { type: 'post' }
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation && post.id) {
        // let userId = this.authService.loggedInUser?.userId;
        // this.feedService.deletePost(userId as string, post.id);
      }
    });
  }

  getProfilePicture(userId: string) {
    if (this.pictureDictionary[userId]?.length > 0) {
      return this.pictureDictionary[userId];
    }
    return './assets/images/no-pic.jpg';
  }

  private initializeFeed(posts: Post[]) {
    if (this.posts.length === 0) {
      this.posts.push(...posts);
      this.posts = this.dateSort.transform(this.posts) as Post[];
    }
  }

  private createPost(post: Post) {
    this.posts.push(post);
    this.posts = this.dateSort.transform(this.posts) as Post[];
    this.checkIfFeedSectionScrollable();
  }

  private updatePost(updatePost: Post) {
    this.posts = this.posts.filter(post => post.id !== updatePost.id);
    this.posts.push(updatePost);
    this.posts = this.dateSort.transform(this.posts) as Post[];
    this.checkIfFeedSectionScrollable();
  }

  private deletePost(postId: string) {
    this.posts = this.posts.filter(post => post.id !== postId);
    this.posts = this.dateSort.transform(this.posts) as Post[];
    this.checkIfFeedSectionScrollable();
  }

  private checkIfFeedSectionScrollable() {
    this.newPostsAvailable =
      this.feedSection.nativeElement.clientHeight < this.feedSection.nativeElement.scrollHeight;
  }
}
