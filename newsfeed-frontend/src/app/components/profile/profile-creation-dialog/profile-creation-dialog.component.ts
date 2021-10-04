import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Profile } from "../../../model/profile.model";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-profile-creation-dialog',
  templateUrl: './profile-creation-dialog.component.html',
  styleUrls: ['./profile-creation-dialog.component.css']
})
export class ProfileCreationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileCreationDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      picture: '',
      description: '',
      postCount: '',
      commentCount: ''
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
      name: data.name,
      userId: userId,
      picture: data.name,
      description: data.description,
      postCount: 0,
      commentCount: 0
    }
  }

}
