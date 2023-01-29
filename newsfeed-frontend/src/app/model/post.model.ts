import { Comment } from './comment.model'
import { Entry } from "./entry.model";

export interface Post extends Entry {
  id?: string;
  userId: string;
  text: string;
  date: Date;
  comments: Comment[];
}
