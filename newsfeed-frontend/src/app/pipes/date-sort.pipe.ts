import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from "../model/comment.model";
import { Entry } from "../model/entry.model";

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

  transform(entry: Entry[] | undefined): Entry[] | undefined {
    if (entry) {
      entry = entry.sort((a, b) => {
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;
      })
    }
    return entry;
  }

}
