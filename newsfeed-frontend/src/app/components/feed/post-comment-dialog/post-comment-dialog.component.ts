import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Post } from "../../../model/post.model";
import { Comment } from "../../../model/comment.model";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-post-comment-dialog',
  templateUrl: './post-comment-dialog.component.html',
  styleUrls: ['./post-comment-dialog.component.css'],
})
export class PostCommentDialogComponent implements OnInit {

  form!: FormGroup;
  post: Post;

  constructor(
    public dialogRef: MatDialogRef<PostCommentDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
      userId: this.authService.loggedInUser?.userId as string,
      text: text,
      date: new Date()
    }
    this.post.comments?.push(comment);
  }

  submit() {
    this.dialogRef.close(this.post);
  }

}
