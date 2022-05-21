import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
  hasProfile: boolean;
  comments: Comment[] = [];
  pictureDictionary: { [userId: string] : string } = {}

  constructor(
    public dialogRef: MatDialogRef<PostCommentDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) data: { post: Post, hasProfile: boolean }
  ) {
    this.post = data.post;
    this.hasProfile = data.hasProfile;
  }

  ngOnInit() {
    // this.profileService.addPictureEventListener().subscribe((pictureDictionary => {
    //   this.pictureDictionary = pictureDictionary;
    // }));
    this.form = this.formBuilder.group({
      commentText: new FormControl('', [Validators.required])
    });
    this.comments.push(...this.post.comments);
  }

  get commentText() { return this.form.get('commentText'); }

  addComment(text: string) {
    const comment: Comment = {
      userId: '', // TODO add id
      text: text,
      date: new Date()
    }
    this.comments.push(comment);
  }

  submit() {
    this.post.comments = this.comments;
    this.dialogRef.close(this.post);
  }

}
