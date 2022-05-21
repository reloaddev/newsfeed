import { Timestamp } from 'firebase/firestore';
import { Comment } from './comment.model'
import { Entry } from "./entry.model";

export interface Post extends Entry {
  id?: string;
  userId: string;
  text: string;
  date: Date;
  comments: Comment[];
}

export interface FirestorePost {
  id?: string;
  userId: string;
  text: string;
  date?: Timestamp;
  comments: Comment[]
}
