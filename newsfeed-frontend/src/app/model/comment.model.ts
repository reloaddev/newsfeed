import { Entry } from "./entry.model";

export interface Comment extends Entry {
  id?: string;
  text: string;
  userId: string;
  date: Date;
}
