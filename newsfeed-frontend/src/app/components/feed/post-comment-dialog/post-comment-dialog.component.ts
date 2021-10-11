import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Post } from "../../../model/post.model";
import { Comment } from "../../../model/comment.model";
import { AuthService } from "../../../services/auth.service";
import { ProfileService } from "../../../services/profile.service";

@Component({
  selector: 'app-post-comment-dialog',
  templateUrl: './post-comment-dialog.component.html',
  styleUrls: ['./post-comment-dialog.component.css'],
})
export class PostCommentDialogComponent implements OnInit {

  form!: FormGroup;
  post: Post;
  comments: Comment[] = [];
  pictureDictionary: { [userId: string] : string } = {}

  constructor(
    public dialogRef: MatDialogRef<PostCommentDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) post: Post
  ) {
    this.post = post;
  }

  ngOnInit() {
    this.profileService.getProfilePictures().subscribe((pictureDictionary => {
      this.pictureDictionary = pictureDictionary;
    }));
    this.form = this.formBuilder.group({
      commentText: ''
    });
    this.comments.push(...this.post.comments);
  }

  addComment(text: string) {
    const comment: Comment = {
      userId: this.authService.loggedInUser?.userId as string,
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
