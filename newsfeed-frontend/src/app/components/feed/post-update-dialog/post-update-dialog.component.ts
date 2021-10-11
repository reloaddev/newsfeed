import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Post } from "../../../model/post.model";

@Component({
  selector: 'app-post-update-dialog',
  templateUrl: './post-update-dialog.component.html',
  styleUrls: ['./post-update-dialog.component.css']
})
export class PostUpdateDialogComponent implements OnInit {

  form!: FormGroup;
  post: Post;

  constructor(
    public dialogRef: MatDialogRef<PostUpdateDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) post: Post
  ) {
    this.post = post;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      postText: this.post.text
    });
  }

  submit() {
    const updatedText = this.form.value.postText;
    this.dialogRef.close(updatedText);
  }

}