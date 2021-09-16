import {Component, OnInit} from '@angular/core';
import {FeedService} from "../services/feed.service";
import {MatDialog} from "@angular/material/dialog";
import {PostCreationDialogComponent} from "./post-creation-dialog/post-creation-dialog.component";
import {PostModel} from "../model/post.model";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: PostModel[] = [];

  constructor(public dialog: MatDialog,
              private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.connect().subscribe(postings => this.posts = postings);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((createdPost: PostModel) => {
      if(createdPost && createdPost.text.length > 0) {
        this.posts.push(createdPost);
        this.feedService.uploadNewPost(createdPost);
      }
    })
  }

  removeAll() {
    this.posts = [];
  }
}
