import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor() { }

  query(): Observable<string[]> {
    return of([
      'Then on it there are placed two divs: "bottom" and "right" which have height and width of your wish. I set up background red to show in more understandable way how it works. bla bla bla.',
      'Then on it there are placed two divs: "bottom" and "right" which have height and width of your wish. I set up background red to show in more understandable way how it works.',
      'Ob du jetzt hier bist oder in China fällt ein Sack Reis um',
      'Morgenstund hat Gold im Mund',
      'Der frühe Vogel fängt den Wurm',
      'Post 5 ist ein nicer Post',
      'Post 6 ist kein nicer Post'
    ])
  }
}
