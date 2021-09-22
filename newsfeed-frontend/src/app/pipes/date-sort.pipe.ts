import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from "../model/comment.model";

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

  transform(comments: Comment[] | undefined): Comment[] | undefined {
    if (comments) {
      comments = comments.sort((a, b) => {
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;
      })
    }
    return comments;
  }

}
