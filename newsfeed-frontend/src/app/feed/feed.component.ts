import {Component, OnInit} from '@angular/core';
import {FeedService} from "../services/feed.service";
import {MatDialog} from "@angular/material/dialog";
import {PostCreationDialogComponent} from "./post-creation-dialog/post-creation-dialog.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  post: string = '';
  posts: string[] = this.feedService.posts;

  constructor(public dialog: MatDialog,
              private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.connect().subscribe(postings => this.posts.push(...postings));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreationDialogComponent, {
      width: '700px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.length > 0) {
        this.posts.push(result);
        this.feedService.uploadNewPost(result);
      }
    })
  }

  removeAll() {
    this.posts = [];
  }
}
