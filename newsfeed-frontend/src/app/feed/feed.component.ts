import {Component, OnInit} from '@angular/core';
import {FeedService} from "../services/feed.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts!: string[];
  index = 0;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.query().subscribe(x => this.posts = x);
  }

  createPost() {
    this.posts.push("NEW ONE " + this.index);
    this.index++;
  }

  removeLastPost() {
    this.posts.pop();
  }

  removeAll() {
    this.posts = [];
  }
}
