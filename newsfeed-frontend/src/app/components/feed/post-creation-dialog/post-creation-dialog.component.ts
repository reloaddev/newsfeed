import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Post } from "../../../model/post.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-post-creation-dialog',
  templateUrl: './post-creation-dialog.component.html',
  styleUrls: ['./post-creation-dialog.component.css']
})
export class PostCreationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostCreationDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      postText: ''
    })
  }

  submit() {
    let post;
    try {
      post = this.createPost(this.form.value.postText);
    } catch (err) {
      return;
    }
    this.dialogRef.close(post);
  }

  createPost(text: string): Post {
    const userId = this.authService.loggedInUser?.userId;
    if (!userId) {
      throw new Error('Cannot create post without userId');
    }
    return {
      userId: userId,
      text: text,
      date: new Date(),
      comments: []
    }
  }

}
