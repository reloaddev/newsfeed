import { Comment } from './comment.model'

export interface Post {
  id?: string;
  userId: string;
  text: string;
  date: Date;
  comments?: Comment[];
}
