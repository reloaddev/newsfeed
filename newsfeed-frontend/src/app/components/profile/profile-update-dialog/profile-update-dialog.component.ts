import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Profile } from "../../../model/profile.model";
import { Picture } from "../../../model/picture.model";
import { PictureService } from "../../../services/picture.service";

@Component({
  selector: 'app-profile-update-dialog',
  templateUrl: './profile-update-dialog.component.html',
  styleUrls: ['./profile-update-dialog.component.css']
})
export class ProfileUpdateDialogComponent implements OnInit {

  form!: FormGroup;
  profile: Profile;
  pictures: Picture[] = [];

  constructor(public dialogRef: MatDialogRef<ProfileUpdateDialogComponent>,
              private formBuilder: FormBuilder,
              private pictureService: PictureService,
              @Inject(MAT_DIALOG_DATA) profile: Profile) {
    this.profile = profile;
  }

  ngOnInit(): void {
    this.pictures = this.pictureService.getPictures();
    this.form = this.formBuilder.group({
      name: this.profile.name,
      description: this.profile.description,
      picture: this.profile.picture
    });
  }

  submit(form: FormGroup) {
    const updatedProfile: Profile = {
      userId: this.profile.userId,
      name: form.value.name,
      description: form.value.description,
      picture: form.value.picture,
      postCount: this.profile.postCount,
      commentCount: this.profile.commentCount
    }
    this.dialogRef.close(updatedProfile);
  }

}
