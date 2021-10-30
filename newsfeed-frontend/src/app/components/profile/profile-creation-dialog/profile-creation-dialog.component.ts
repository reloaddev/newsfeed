import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Profile } from "../../../model/profile.model";
import { AuthService } from "../../../services/auth.service";
import { PictureService } from "../../../services/picture.service";
import { Picture } from "../../../model/picture.model";

@Component({
  selector: 'app-profile-creation-dialog',
  templateUrl: './profile-creation-dialog.component.html',
  styleUrls: ['./profile-creation-dialog.component.css']
})
export class ProfileCreationDialogComponent implements OnInit {

  form!: FormGroup;
  pictures: Picture[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProfileCreationDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.pictures = this.pictureService.getPictures();
    this.form = this.formBuilder.group({
      description: '',
      picture: ''
    })
  }

  submit() {
    let profile;
    try {
      profile = this.createProfile(this.form.value);
    } catch (err) {
      return;
    }
    this.dialogRef.close(profile)
  }

  createProfile(data: any): Profile {
    const userId = this.authService.loggedInUser?.userId;
    if (!userId) {
      throw new Error('Cannot create profile without userId');
    }
    return {
      userId: userId,
      description: data.description,
      picture: data.picture,
      postCount: 0,
      commentCount: 0
    }
  }

}
