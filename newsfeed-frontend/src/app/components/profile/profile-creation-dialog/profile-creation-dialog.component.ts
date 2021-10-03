import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Profile } from "../../../model/profile.model";

@Component({
  selector: 'app-profile-creation-dialog',
  templateUrl: './profile-creation-dialog.component.html',
  styleUrls: ['./profile-creation-dialog.component.css']
})
export class ProfileCreationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileCreationDialogComponent>,
    private formBuilder: FormBuilder
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

  submit(form: FormGroup): void {
    let profile = this.createProfile(this.form.value);
    this.dialogRef.close(profile)
  }

  createProfile(data: any): Profile {
    return {
      name: data.name,
      userId: 'HP-123',
      picture: data.name,
      description: data.description,
      postCount: 0,
      commentCount: 0
    }
  }

}
