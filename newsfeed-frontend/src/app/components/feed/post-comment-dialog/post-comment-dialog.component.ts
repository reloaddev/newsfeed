import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Post } from "../../../model/post.model";
import { Comment } from "../../../model/comment.model";
import { DateSortPipe } from "../../../pipes/date-sort.pipe";

@Component({
  selector: 'app-post-comment-dialog',
  templateUrl: './post-comment-dialog.component.html',
  styleUrls: ['./post-comment-dialog.component.css'],
})
export class PostCommentDialogComponent implements OnInit {

  form!: FormGroup;
  post: Post;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PostCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) post: Post
  ) {
    this.post = post;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      commentText: ''
    })
  }

  addComment(text: string) {
    const comment: Comment = {
      userId: 'HP',
      text: text,
      date: new Date()
    }
    this.post.comments?.push(comment);
  }

  submit(form: FormGroup): void {
    this.dialogRef.close(this.post);
  }

}
