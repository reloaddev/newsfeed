import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: string[] = [
    'Post 1 ist ein nicer Post',
    'Post 2 ist kein nicer Post',
    'Ob du jetzt hier bist oder in China fällt ein Sack Reis um',
    'Morgenstund hat Gold im Mund',
    'Der frühe Vogel fängt den Wurm',
    'Post 5 ist ein nicer Post',
    'Post 6 ist kein nicer Post'
  ]

  index = 0;

  constructor() { }

  ngOnInit(): void {
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
