import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-creation-dialog',
  templateUrl: './post-creation-dialog.component.html',
  styleUrls: ['./post-creation-dialog.component.css']
})
export class PostCreationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostCreationDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      postText: new FormControl('', [Validators.required])
    })
  }

  get postText() { return this.form.get('postText'); }

  submit() {
    const post = this.createPost(this.form.value.postText);
    this.dialogRef.close(post);
  }

  createPost(text: string): Post {
    const userId = 'TEST_MODE' // TODO change to real user id
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
