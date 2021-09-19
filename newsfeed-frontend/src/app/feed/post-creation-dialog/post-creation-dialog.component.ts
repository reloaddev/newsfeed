import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../model/post";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-post-creation-dialog',
  templateUrl: './post-creation-dialog.component.html',
  styleUrls: ['./post-creation-dialog.component.css']
})
export class PostCreationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PostCreationDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      postText: ''
    })
  }

  submit(form: FormGroup): void {
    let post = this.createPost(this.form.value.postText);
    this.dialogRef.close(post);
  }

  createPost(text: string): Post {
    return {
      id: '.',
      userId: 'HP',
      text: text,
      date: new Date().toDateString()
    }
  }

}
