import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
    let post;
    try {
      this.createPost(this.form.value.postText);
    } catch (err) {
      return;
    }
    this.dialogRef.close(post);
  }

  createPost(text: string): void {
    // const userId = this.authService.loggedInUser?.userId;
    // if (!userId) {
    //   throw new Error('Cannot create post without userId');
    // }
    // return {
    //   userId: userId,
    //   text: text,
    //   date: new Date(),
    //   comments: []
    // }
  }

}
